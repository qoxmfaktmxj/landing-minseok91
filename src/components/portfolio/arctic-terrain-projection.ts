import * as THREE from "three";

/** Continuous world-space snow material on the authored terrain meshes. */
export function applyTerrainProjection(
  renderer: THREE.WebGLRenderer,
  meshes: THREE.Mesh[],
  photograph: THREE.Texture,
) {
  const projector = new THREE.PerspectiveCamera(52, 10 / 7, .1, 1000);
  projector.position.set(-13.49, 2.65, 14.43);
  projector.lookAt(0, 1.23686, 0);
  projector.updateMatrixWorld();
  const matrix = projector.projectionMatrix.clone().multiply(projector.matrixWorldInverse);
  const materials = meshes.map(mesh => mesh.material);

  photograph.colorSpace = THREE.SRGBColorSpace;
  photograph.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
  for (const material of new Set(materials.flat() as THREE.MeshStandardMaterial[])) {
    const previousCompile = material.onBeforeCompile;
    material.onBeforeCompile = (shader, activeRenderer) => {
      previousCompile.call(material, shader, activeRenderer);
      Object.assign(shader.uniforms, {
        terrainPhoto: { value: photograph },
        terrainProjector: { value: matrix }, terrainExposure: { value: renderer.toneMappingExposure },
        terrainInverseInput: { value: new THREE.Matrix3().set(.59719,.35458,.04823,.076,.90834,.01566,.0284,.13383,.83777).invert() },
        terrainInverseOutput: { value: new THREE.Matrix3().set(1.60475,-.53108,-.07367,-.10208,1.10813,-.00605,-.00327,-.07276,1.07602).invert() },
      });
      shader.vertexShader = `uniform mat4 terrainProjector; varying vec4 vTerrainProjection; varying vec3 vTerrainWorld,vTerrainNormal;\n${shader.vertexShader}`;
      shader.vertexShader = shader.vertexShader.replace("#include <begin_vertex>", `#include <begin_vertex>
        vec4 terrainWorld=modelMatrix*vec4(transformed,1.);
        vTerrainWorld=terrainWorld.xyz;vTerrainNormal=normalize(mat3(modelMatrix)*normal);
        vTerrainProjection=terrainProjector*terrainWorld;`);
      shader.fragmentShader = `
        uniform sampler2D terrainPhoto;
        uniform float terrainExposure;
        uniform mat3 terrainInverseInput,terrainInverseOutput;
        varying vec4 vTerrainProjection;
        varying vec3 vTerrainWorld,vTerrainNormal;
        vec3 terrainRadiance(vec3 color) {
          float nearSnow=1.-smoothstep(19.,42.,vTerrainProjection.w);
          float sunFacing=dot(normalize(vTerrainNormal),normalize(vec3(.8,.55,-.7)));
          float snowShadow=nearSnow*(1.-smoothstep(.45,.90,sunFacing));
          color*=mix(vec3(1.),vec3(.45,.49,.55),snowShadow);
          vec3 v=clamp(terrainInverseOutput*color,0.,.985);
          vec3 a=v*.983729-1.,b=v*.432951-.0245786,c=v*.238081+.000090537;
          vec3 fitted=(-b-sqrt(max(b*b-4.*a*c,vec3(0.))))/(2.*a);
          return max(terrainInverseInput*fitted,vec3(0.))*.6/terrainExposure;
        }
        ${shader.fragmentShader}`;
      shader.fragmentShader = shader.fragmentShader.replace("#include <shadowmap_pars_fragment>", "#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>");
      shader.fragmentShader = shader.fragmentShader.replace("#include <opaque_fragment>", `
        vec2 terrainUv=vTerrainProjection.xy/max(vTerrainProjection.w,.1)*.5+.5;
        float margin=min(min(terrainUv.x,terrainUv.y),min(1.-terrainUv.x,1.-terrainUv.y));
        float terrainSupport=smoothstep(.0,.025,margin)*step(.1,vTerrainProjection.w);
        float terrainWeight=terrainSupport*.94;
        vec2 snowPatch=abs(fract(vTerrainWorld.xz*.08)*2.-1.)*vec2(.29,.16)+vec2(.63,.035);
        vec3 patchSnow=texture2D(terrainPhoto,snowPatch).rgb;
        vec3 broadLight=texture2D(terrainPhoto,clamp(terrainUv,0.,1.),5.).rgb;
        float patchGrain=clamp(dot(patchSnow,vec3(.299,.587,.114))*2.8,.72,1.28);
        vec3 uncoveredSnow=terrainRadiance(mix(patchSnow,broadLight*patchGrain,smoothstep(0.,.03,margin))*.78);
        float uncoveredLight=smoothstep(-.2,.8,dot(normalize(vTerrainNormal),normalize(vec3(.8,.55,-.7))));
        uncoveredSnow*=mix(.84,1.06,uncoveredLight)*mix(.40,1.,getShadowMask());
        outgoingLight=mix(outgoingLight,uncoveredSnow,.88);
        vec3 photographedSnow=terrainRadiance(texture2D(terrainPhoto,clamp(terrainUv,0.,1.)).rgb*.78);
        photographedSnow*=mix(.40,1.,getShadowMask());
        outgoingLight=mix(outgoingLight,photographedSnow,terrainWeight);
        float distantGround=smoothstep(23.,42.,vTerrainProjection.w)*(1.-smoothstep(1.,5.,vTerrainWorld.y))*smoothstep(0.,.03,margin);
        vec3 softDistantSnow=terrainRadiance(texture2D(terrainPhoto,clamp(terrainUv,0.,1.),5.).rgb*.78);
        outgoingLight=mix(outgoingLight,softDistantSnow,distantGround*.92);
        #include <opaque_fragment>`);
      shader.fragmentShader = shader.fragmentShader.replace("#include <fog_fragment>", `
        vec3 photographedFog=gl_FragColor.rgb;
        #include <fog_fragment>
        gl_FragColor.rgb=mix(gl_FragColor.rgb,photographedFog,terrainSupport);`);
    };
    material.needsUpdate = true;
  }
}
