import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { createArcticLandscape } from "./arctic-landscape";
import { applyTerrainProjection } from "./arctic-terrain-projection";

const hash = (x: number, y: number) => {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
};
const noise = (x: number, y: number) => {
  const ix = Math.floor(x), iy = Math.floor(y);
  let fx = x - ix, fy = y - iy;
  fx *= fx * (3 - 2 * fx); fy *= fy * (3 - 2 * fy);
  return THREE.MathUtils.lerp(THREE.MathUtils.lerp(hash(ix, iy), hash(ix + 1, iy), fx), THREE.MathUtils.lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), fx), fy);
};
const ridge = (x: number, y: number) => {
  let value = 0, amplitude = .5;
  for (let i = 0; i < 5; i++) {
    value += (1 - Math.abs(noise(x, y) * 2 - 1)) * amplitude;
    x = x * 2.1 + 11; y = y * 2.1 - 7; amplitude *= .48;
  }
  return value;
};
const terrainHeight = (x: number, z: number) => {
  const sx = (x + z) * Math.SQRT1_2, depth = (x - z) * Math.SQRT1_2;
  const peak = (px: number, pz: number, width: number, height: number) => height * Math.exp(-((sx - px) ** 2 + (depth - pz) ** 2) / width ** 2);
  const hills = peak(-3.7, -7, 3.2, 2.00) + peak(-5.4, -9, 3.7, .40) + peak(7, -5, 4.5, 1.1) + peak(-12, 6, 9, .7) + peak(15, 9, 10, 1.2);
  const middle = 1.3 * Math.exp(-(((sx + 12) / 8) ** 2 + ((depth - 7 - sx * .22) / 4) ** 2))
    + 1.5 * Math.exp(-(((sx - 14) / 10) ** 2 + ((depth - 11 + sx * .16) / 4.5) ** 2))
    + .9 * Math.exp(-(((sx - 1) / 18) ** 2 + ((depth - 22 - sx * .12) / 5) ** 2));
  const detail = ridge(x * .32, z * .32) * .62 + noise(x * 1.2, z * 1.2) * .055;
  const flatten = THREE.MathUtils.smoothstep(Math.hypot(x, z), 2.8, 11);
  return (hills + middle + detail - .34) * flatten - .51;
};

function roundedFrostBox() {
  // Retain a grid across each face so convexity is real geometry, not a shading frame.
  const geometry = new THREE.BoxGeometry(1, 1, 1, 18, 14, 10);
  const positions = geometry.attributes.position;
  const point = new THREE.Vector3();
  const core = new THREE.Vector3();
  for (let i = 0; i < positions.count; i++) {
    point.fromBufferAttribute(positions, i);
    core.copy(point).clampScalar(-.35, .35);
    point.sub(core).normalize().multiplyScalar(.15).add(core);
    positions.setXYZ(i, point.x, point.y, point.z);
  }
  return geometry;
}

function blockGeometry(y0: number, y1: number, angle0: number, angle1: number) {
  const geometry = roundedFrostBox();
  const positions = geometry.attributes.position;
  const frostUv = new Float32Array(positions.count * 2);
  const center = new THREE.Vector3();
  for (let i = 0; i < positions.count; i++) {
    frostUv[i * 2] = positions.getX(i) + .5; frostUv[i * 2 + 1] = positions.getY(i) + .5;
    const y = THREE.MathUtils.lerp(y0, y1, positions.getY(i) + .5);
    const angle = THREE.MathUtils.lerp(angle0, angle1, positions.getX(i) + .5);
    const latitude = Math.max(0, (y - 1.40) / 2.33);
    const cosLatitude = Math.sqrt(Math.max(.008, 1 - latitude * latitude));
    const faceCenter = Math.max(0, 1 - 4 * positions.getX(i) ** 2) * Math.max(0, 1 - 4 * positions.getY(i) ** 2);
    const bulge = faceCenter * Math.pow(positions.getZ(i) + .5, 3) * .14;
    const depth = (.5 - positions.getZ(i)) * .68 - bulge;
    const radius = (2.60 - depth) * cosLatitude;
    const jitter = (noise(angle * 11, y * 13) - .5) * .028 + (noise(angle * 33, y * 27) - .5) * .008;
    positions.setXYZ(i, (radius + jitter) * Math.sin(angle), y - depth * latitude, (radius + jitter) * Math.cos(angle) - .75);
  }
  geometry.setAttribute("frostUv", new THREE.BufferAttribute(frostUv, 2));
  geometry.computeBoundingBox();
  geometry.boundingBox!.getCenter(center);
  geometry.translate(-center.x, -center.y, -center.z);
  geometry.computeVertexNormals();
  return { geometry, center };
}

function entranceBlock(a0: number, a1: number, front: number, back: number) {
  const geometry = roundedFrostBox();
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const angle = THREE.MathUtils.lerp(a1, a0, position.getX(i) + .5);
    const roofBulge = Math.max(0, 1 - 4 * position.getX(i) ** 2) * Math.max(0, 1 - 4 * position.getZ(i) ** 2) * Math.max(0, position.getY(i)) * .18;
    const radius = 1.02 + position.getY(i) * .56 + roofBulge;
    position.setXYZ(i, Math.cos(angle) * radius, .20 + Math.sin(angle) * radius * 1.15, THREE.MathUtils.lerp(back, front, position.getZ(i) + .5));
  }
  geometry.computeBoundingBox();
  const center = geometry.boundingBox!.getCenter(new THREE.Vector3());
  geometry.translate(-center.x, -center.y, -center.z);
  geometry.computeVertexNormals();
  return { geometry, center };
}

function openCavityEntrance(geometry: THREE.BufferGeometry) {
  const positions = geometry.attributes.position;
  const source = geometry.getIndex()!;
  const indices: number[] = [];
  for (let i = 0; i < source.count; i += 3) {
    const a = source.getX(i), b = source.getX(i + 1), c = source.getX(i + 2);
    const x = (positions.getX(a) + positions.getX(b) + positions.getX(c)) / 3;
    const y = (positions.getY(a) + positions.getY(b) + positions.getY(c)) / 3;
    const z = (positions.getZ(a) + positions.getZ(b) + positions.getZ(c)) / 3;
    if (Math.abs(x) < 1.1 && y < 1.35 && z > .9) continue;
    indices.push(a, b, c);
  }
  geometry.setIndex(indices);
}

export async function createArcticScene(canvas: HTMLCanvasElement, signal: AbortSignal) {
  if (signal.aborted) throw new DOMException("Scene initialization cancelled", "AbortError");
  const mobile = window.matchMedia("(pointer: coarse)").matches;
  const texturePath = mobile ? "/images/arctic/mobile" : "/images/arctic";
  const loader = new THREE.TextureLoader();
  const textureResults = await Promise.allSettled([
    loader.loadAsync(`${texturePath}/rough_plaster_03-diffuse.webp`),
    loader.loadAsync(`${texturePath}/rough_plaster_03-nor_gl.webp`),
    loader.loadAsync(`${texturePath}/aerial_rocks_02-diffuse.webp`),
    loader.loadAsync(`${texturePath}/aerial_rocks_02-nor_gl.webp`),
    loader.loadAsync(`${texturePath}/snow_02-diffuse.webp`),
    loader.loadAsync("/images/arctic/surface-plate-six.webp"),
    loader.loadAsync("/images/arctic/terrain-light-ridges.webp"),
  ]);
  const textures = textureResults.flatMap(result => result.status === "fulfilled" ? [result.value] : []);
  if (signal.aborted || textures.length !== textureResults.length) {
    textures.forEach(texture => texture.dispose());
    if (signal.aborted) throw new DOMException("Scene initialization cancelled", "AbortError");
    throw new Error("The arctic surface textures could not be loaded.");
  }
  const [frost, bump, terrainMap, terrainBump, snowAlbedo, surfacePlate, terrainPlate] = textures;
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, powerPreference: "low-power" });
  } catch (error) {
    textures.forEach(texture => texture.dispose());
    throw error;
  }
  let shaderFailed = false;
  renderer.debug.onShaderError = () => { shaderFailed = true; };
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .80;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#aeb5c3");
  scene.fog = new THREE.Fog("#a3abba", 18, 74);
  const camera = new THREE.PerspectiveCamera(30, 1, .1, 1000);
  const baseCamera = new THREE.Vector3(-13.49, 2.65, 14.43);
  const lookTarget = new THREE.Vector3(0, 1.23686, 0);
  camera.position.copy(baseCamera);
  camera.lookAt(lookTarget);
  scene.add(new THREE.HemisphereLight(0xdce5f4, 0x414d63, 1.2));
  const snowFill = new THREE.DirectionalLight(0xdce9ff, .45);
  snowFill.position.set(-8, 4, 12);
  scene.add(snowFill);
  const sun = new THREE.DirectionalLight(0xf4f7ff, 1.7);
  sun.position.set(3, 10, -4);
  sun.castShadow = true;
  const shadowSize = mobile ? 1024 : 2048;
  sun.shadow.mapSize.set(shadowSize, shadowSize);
  sun.shadow.camera.left = sun.shadow.camera.bottom = -12;
  sun.shadow.camera.right = sun.shadow.camera.top = 12;
  sun.shadow.camera.far = 36;
  sun.shadow.normalBias = .035;
  sun.shadow.bias = -.0002;
  sun.shadow.radius = 3;
  scene.add(sun);
  frost.colorSpace = THREE.SRGBColorSpace;
  surfacePlate.colorSpace = THREE.SRGBColorSpace;
  snowAlbedo.colorSpace = THREE.SRGBColorSpace; snowAlbedo.wrapS = snowAlbedo.wrapT = THREE.RepeatWrapping;
  for (const texture of [frost, bump]) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    texture.repeat.set(2.4, 2.4);
  }
  const ice = new THREE.MeshStandardMaterial({ color: 0xd4deeb, map: frost, normalMap: bump, normalScale: new THREE.Vector2(.28, .28), roughness: .76, metalness: 0 });
  ice.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace("#include <common>", "#include <common>\nattribute vec2 frostUv; attribute float frostBaseY; varying vec2 vFrostCoord; varying float vFrostMotion;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvFrostCoord = frostUv; vFrostMotion = max(0., modelMatrix[3].y / frostBaseY - 1.);");
    shader.fragmentShader = shader.fragmentShader.replace("#include <common>", "#include <common>\nvarying vec2 vFrostCoord; varying float vFrostMotion;").replace("#include <map_fragment>", `#include <map_fragment>
      float frostGrain = texture2D(map, vMapUv * 2.0).r;
      float frostBorder = smoothstep(.37, .50, max(abs(vFrostCoord.x - .5), abs(vFrostCoord.y - .5)) + (frostGrain - .5) * .045);
      float frostAlbedo = clamp(dot(diffuseColor.rgb, vec3(.299, .587, .114)) * 3.1, .18, .68);
      diffuseColor.rgb = mix(vec3(.93, 1.0, 1.10) * frostAlbedo, vec3(.76, .84, .94), frostBorder * .22);
    `);
    shader.fragmentShader = shader.fragmentShader.replace("#include <roughnessmap_fragment>", `#include <roughnessmap_fragment>
      roughnessFactor = mix(.58, .84, clamp(frostGrain * .8 + frostBorder * .4, 0., 1.));
    `);
    shader.fragmentShader = shader.fragmentShader.replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
      float frostRim = pow(1.0 - max(0.0, dot(normalize(vNormal), normalize(vViewPosition))), 5.0);
      totalEmissiveRadiance += vec3(.63, .76, .94) * (frostRim * .09 + pow(frostBorder, 3.0) * .06);
    `);
  };
  const plateCamera = new THREE.PerspectiveCamera(30, 1586 / 992, .1, 1000);
  plateCamera.position.copy(baseCamera);
  plateCamera.lookAt(lookTarget);
  plateCamera.updateMatrixWorld();
  const plateProjector = plateCamera.projectionMatrix.clone().multiply(plateCamera.matrixWorldInverse);
  const photoIce = ice.clone();
  photoIce.onBeforeCompile = shader => {
    ice.onBeforeCompile(shader, renderer);
    Object.assign(shader.uniforms, {
      surfacePlate: { value: surfacePlate },
      plateExposure: { value: renderer.toneMappingExposure },
      inverseAcesInput: { value: new THREE.Matrix3().set(.59719,.35458,.04823,.076,.90834,.01566,.0284,.13383,.83777).invert() },
      inverseAcesOutput: { value: new THREE.Matrix3().set(1.60475,-.53108,-.07367,-.10208,1.10813,-.00605,-.00327,-.07276,1.07602).invert() },
    });
    shader.vertexShader = `attribute vec4 basePlateCoordinate; attribute float baseHeight; varying vec4 vBasePlateCoordinate; varying float vBaseHeight;\n${shader.vertexShader}`;
    shader.vertexShader = shader.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\nvBasePlateCoordinate = basePlateCoordinate; vBaseHeight = baseHeight;");
    shader.fragmentShader = `
      uniform sampler2D surfacePlate;
      uniform float plateExposure;
      uniform mat3 inverseAcesInput, inverseAcesOutput;
      varying vec4 vBasePlateCoordinate;
      varying float vBaseHeight;
      vec3 plateRadiance(vec3 displayLinear) {
        vec3 v = clamp(inverseAcesOutput * displayLinear, 0., .985);
        vec3 a = v * .983729 - 1., b = v * .432951 - .0245786, c = v * .238081 + .000090537;
        vec3 fitted = (-b - sqrt(max(b*b - 4.*a*c, vec3(0.)))) / (2.*a);
        return max(inverseAcesInput * fitted, vec3(0.)) * .6 / plateExposure;
      }
      ${shader.fragmentShader}`;
    shader.fragmentShader = shader.fragmentShader.replace("#include <opaque_fragment>", `
      vec2 plateUv = vBasePlateCoordinate.xy / vBasePlateCoordinate.w * .5 + .5;
      float baseHeight = vBaseHeight;
      vec3 frostNormal = inverseTransformDirection(normal, viewMatrix);
      float sunlight = smoothstep(-.10, .90, dot(frostNormal, normalize(vec3(.85, .65, .46))));
      vec3 shadowGrade = mix(vec3(.085, .105, .145), vec3(.15, .18, .23), smoothstep(-.4, 1.1, baseHeight));
      vec3 quietGrade = mix(shadowGrade, vec3(.53, .60, .70), sunlight);
      float opened = smoothstep(.012, .20, vFrostMotion);
      vec3 openedGrade = mix(vec3(.20, .25, .33), vec3(.60, .68, .79), sunlight);
      float plateDetail = dot(texture2D(surfacePlate, plateUv).rgb, vec3(.299, .587, .114));
      float plateBody = dot(texture2D(surfacePlate, plateUv, 3.).rgb, vec3(.299, .587, .114));
      float frostDetail = clamp(plateDetail / max(.04, plateBody), .72, 1.28);
      vec3 photographedFrost = mix(quietGrade, openedGrade, opened) * mix(1., frostDetail, .55);
      outgoingLight = mix(outgoingLight, plateRadiance(photographedFrost), .64);
      float edgeDistance = .5 - max(abs(vFrostCoord.x - .5), abs(vFrostCoord.y - .5));
      float seamGlow = 1.0 - smoothstep(.012, .075, edgeDistance);
      float edgeFrost = pow(1. - max(0., dot(normalize(vNormal), normalize(vViewPosition))), 3.);
      outgoingLight += vec3(.66, .79, .96) * (seamGlow * (.07 + opened * .42) + edgeFrost * .12);
      #include <opaque_fragment>
    `);
  };
  terrainMap.colorSpace = THREE.SRGBColorSpace;
  for (const texture of [terrainMap, terrainBump]) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(95, 95); texture.anisotropy = 8;
  }
  const terrainMaterial = new THREE.MeshStandardMaterial({ color: 0xb6c0ce, map: terrainMap, normalMap: terrainBump, normalScale: new THREE.Vector2(.35, .35), roughness: .98, metalness: 0 });
  terrainMaterial.onBeforeCompile = shader => {
    shader.uniforms.uSnowAlbedo = { value: snowAlbedo };
    shader.vertexShader = shader.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vSnowNormal;").replace("#include <beginnormal_vertex>", "#include <beginnormal_vertex>\nvSnowNormal = normalize(mat3(modelMatrix) * objectNormal);");
    shader.fragmentShader = shader.fragmentShader.replace("#include <common>", "#include <common>\nuniform sampler2D uSnowAlbedo; varying vec3 vSnowNormal;");
    shader.fragmentShader = shader.fragmentShader.replace("#include <map_fragment>", `#include <map_fragment>
      float frostLuma = dot(diffuseColor.rgb, vec3(.299, .587, .114));
      vec3 snowColor = min(texture2D(uSnowAlbedo, vMapUv * .8).rgb * vec3(1.13, 1.22, 1.35), vec3(.75, .79, .85));
      float windFacing = dot(normalize(vSnowNormal), normalize(vec3(.8, .55, -.7)));
      float cover = .34 + smoothstep(.30, .96, vSnowNormal.y) * .42;
      vec3 snowSurface = mix(vec3(frostLuma * .96, frostLuma, frostLuma * 1.06) * 1.7, snowColor, cover);
      snowSurface *= .80 + texture2D(uSnowAlbedo, vMapUv * 5.).r * .40;
      diffuseColor.rgb = snowSurface * mix(vec3(.38,.43,.56), vec3(1.10,1.13,1.18), smoothstep(-.12,.78,windFacing));
    `);
  };
  const terrainSegments = mobile ? 180 : 300;
  const terrainGeometry = new THREE.PlaneGeometry(150, 150, terrainSegments, terrainSegments);
  terrainGeometry.rotateX(-Math.PI / 2);
  const vertices = terrainGeometry.attributes.position;
  for (let i = 0; i < vertices.count; i++) {
    const x = Math.sign(vertices.getX(i)) * 75 * Math.pow(Math.abs(vertices.getX(i)) / 75, 1.65);
    const z = Math.sign(vertices.getZ(i)) * 75 * Math.pow(Math.abs(vertices.getZ(i)) / 75, 1.65);
    vertices.setXYZ(i, x, terrainHeight(x, z) - .04, z);
    terrainGeometry.attributes.uv.setXY(i, x / 150 + .5, z / 150 + .5);
  }
  terrainGeometry.computeVertexNormals();
  const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
  terrain.receiveShadow = true;
  scene.add(terrain);
  const landscape = createArcticLandscape(scene, terrainMap, terrainBump, snowAlbedo, ridge);
  applyTerrainProjection(renderer, [terrain, ...landscape.meshes], terrainPlate);
  const igloo = new THREE.Group();
  scene.add(igloo);
  const spillLight = new THREE.PointLight(0xdfefff, 0, 5, 2);
  spillLight.position.set(0, -.40, 2.8); scene.add(spillLight);
  const cavityLight = new THREE.PointLight(0xe1f2ff, 30, 7, 2);
  cavityLight.position.set(0, 1.3, -.75); igloo.add(cavityLight);
  const innerIce = new THREE.MeshStandardMaterial({ color: 0xd3e3f5, emissive: 0x86aacb, emissiveIntensity: .65, normalMap: bump, roughness: .73 });
  const sideIce = ice.clone();
  sideIce.onBeforeCompile = shader => {
    ice.onBeforeCompile(shader, renderer);
    shader.fragmentShader = shader.fragmentShader.replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
      float sideFrostLight = dot(totalEmissiveRadiance, vec3(.299, .587, .114));
      totalEmissiveRadiance = vec3(.80, .93, 1.08) * sideFrostLight * (.06 + smoothstep(.02, .20, vFrostMotion) * 2.4);
    `);
  };
  sideIce.emissive.set(0xffffff);
  sideIce.emissiveMap = frost;
  sideIce.emissiveIntensity = .80;
  innerIce.map = frost;
  innerIce.emissiveMap = frost;
  innerIce.onBeforeCompile = sideIce.onBeforeCompile;
  const archInside = new THREE.MeshStandardMaterial({ color: 0x7a8da3, map: frost, normalMap: bump, normalScale: new THREE.Vector2(.24, .24), roughness: .84 });
  archInside.onBeforeCompile = shader => {
    shader.vertexShader = `varying float vTunnelHeight;\n${shader.vertexShader}`;
    shader.vertexShader = shader.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\nvTunnelHeight=(modelMatrix*vec4(transformed,1.)).y;");
    shader.fragmentShader = `varying float vTunnelHeight;\n${shader.fragmentShader}`;
    shader.fragmentShader = shader.fragmentShader.replace("#include <map_fragment>", `#include <map_fragment>
      float iceLuma=clamp(dot(diffuseColor.rgb,vec3(.299,.587,.114))*2.0,.07,.28);
      float course=fract((vTunnelHeight+.55)/.73);
      float seam=1.-smoothstep(.006,.027,min(course,1.-course)*.73);
      diffuseColor.rgb=vec3(.80,.91,1.10)*iceLuma*(1.-seam*.45);`);
    shader.fragmentShader = shader.fragmentShader.replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
      totalEmissiveRadiance+=vec3(.70,.84,1.02)*(.055+iceLuma*.22)*(1.-seam*.60);`);
  };
  const blocks: { mesh: THREE.Mesh; base: THREE.Vector3; amount: number; target: number; id: number }[] = [];
  const addBlock = (geometry: THREE.BufferGeometry, center: THREE.Vector3, innerFace = -1) => {
    if (!geometry.attributes.frostUv) geometry.setAttribute("frostUv", geometry.attributes.uv.clone());
    // Bake the original world projection into the mesh. It moves with each block.
    const positions = geometry.attributes.position;
    const coordinates = new Float32Array(positions.count * 4);
    const baseHeights = new Float32Array(positions.count);
    const originalPoint = new THREE.Vector4();
    for (let i = 0; i < positions.count; i++) {
      const x = (positions.getX(i) + center.x) * igloo.scale.x;
      const y = (positions.getY(i) + center.y) * igloo.scale.y;
      const z = (positions.getZ(i) + center.z) * igloo.scale.z;
      originalPoint.set(x, y, z, 1).applyMatrix4(plateProjector);
      originalPoint.toArray(coordinates, i * 4);
      baseHeights[i] = y;
    }
    geometry.setAttribute("basePlateCoordinate", new THREE.BufferAttribute(coordinates, 4));
    geometry.setAttribute("baseHeight", new THREE.BufferAttribute(baseHeights, 1));
    // 초기 중심 높이와 모델 행렬에서 벌어짐을 구해 매 프레임 정점 전송을 피한다.
    geometry.setAttribute("frostBaseY", new THREE.BufferAttribute(new Float32Array(positions.count).fill(center.y), 1));
    const materials = [ice, ice, ice, ice, ice, ice];
    if (innerFace === 5) for (let face = 0; face < 4; face++) materials[face] = sideIce;
    if (innerFace >= 0) materials[innerFace] = innerFace === 3 ? archInside : innerIce;
    materials[4] = photoIce;
    if (innerFace === 3) materials[2] = photoIce;
    if (innerFace === -1) materials[1] = photoIce;
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.position.copy(center);
    mesh.castShadow = mesh.receiveShadow = true;
    igloo.add(mesh);
    blocks.push({ mesh, base: center.clone(), amount: 0, target: 0, id: blocks.length + 1 });
  };
  const levels = [-.55, .20, 1.05, 1.86, 2.64, 3.33, 3.73];
  const counts = [11, 10, 13, 12, 10, 6];
  for (let row = 0; row < counts.length; row++) {
    const count = counts[row];
    for (let j = 0; j < count; j++) {
      const opening = row < 2 ? 1.0 : row === 2 ? .5 : 0;
      const span = (Math.PI * 2 - opening) / count;
      const angle = opening / 2 + (j + (row >= 3 ? (row % 2) * .5 : 0)) * span;
      const { geometry, center } = blockGeometry(levels[row] + .006, levels[row + 1] - .006, angle + .003, angle + span - .003);
      addBlock(geometry, center, 5);
    }
  }
  const glowMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(.85, .98, 1.12), toneMapped: false, transparent: true, opacity: 0, depthWrite: false });
  const glowGeometry = new THREE.SphereGeometry(2.25, 64, 48, 0, Math.PI * 2, 0, Math.PI / 2);
  glowGeometry.translate(0, 1.40, -.75);
  openCavityEntrance(glowGeometry);
  igloo.add(new THREE.Mesh(glowGeometry, glowMaterial));
  const lowerGlow = new THREE.Mesh(new THREE.CylinderGeometry(2.25, 2.25, 1.95, 64), glowMaterial);
  lowerGlow.geometry.translate(0, .425, -.75);
  openCavityEntrance(lowerGlow.geometry);
  igloo.add(lowerGlow);
  for (const side of [-1, 1]) {
    const geometry = new RoundedBoxGeometry(.56, .75, 1.73, 4, .065);
    addBlock(geometry, new THREE.Vector3(side * 1.02, -.175, 2.315));
  }
  for (let section = 0; section < 6; section++) {
    const { geometry, center } = entranceBlock(section * Math.PI / 6 + .006, (section + 1) * Math.PI / 6 - .006, 3.18, 1.45);
    addBlock(geometry, center, 3);
  }
  const entranceGlowGeometry = new THREE.TorusGeometry(1.02, .06, 12, 48, Math.PI);
  const entranceGlow = new THREE.Mesh(entranceGlowGeometry, glowMaterial);
  entranceGlow.scale.y = 1.15;
  entranceGlow.position.set(0, .20, 2.95); igloo.add(entranceGlow);
  const tunnelGeometry = new THREE.PlaneGeometry(Math.PI, 2.0, 24, 4);
  const tunnelVertices = tunnelGeometry.attributes.position;
  for (let i = 0; i < tunnelVertices.count; i++) {
    const angle = tunnelVertices.getX(i), z = tunnelVertices.getY(i) + 2.15;
    tunnelVertices.setXYZ(i, .71 * Math.sin(angle), .2 + .71 * Math.cos(angle) * 1.15, z);
  }
  tunnelGeometry.computeVertexNormals();
  igloo.add(new THREE.Mesh(tunnelGeometry, archInside));
  for (const side of [-1, 1]) {
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(2.0, .75), archInside);
    wall.rotation.y = -side * Math.PI / 2;
    wall.position.set(side * .71, -.175, 2.15); igloo.add(wall);
  }
  const interior = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.65), new THREE.MeshBasicMaterial({ color: 0x53647a }));
  interior.position.set(0, .275, .99); igloo.add(interior);

  const snowCount = mobile ? 600 : 1200;
  const snowPositions = new Float32Array(snowCount * 3);
  const snowVariations = new Float32Array(snowCount);
  for (let i = 0; i < snowCount; i++) {
    snowPositions[i * 3] = (hash(i, 13) - .5) * 36;
    snowPositions[i * 3 + 1] = hash(i, 39) * 14;
    snowPositions[i * 3 + 2] = (hash(i, 67) - .5) * 36;
    snowVariations[i] = hash(i, 97);
  }
  const snowGeometry = new THREE.BufferGeometry();
  snowGeometry.setAttribute("position", new THREE.BufferAttribute(snowPositions, 3));
  snowGeometry.setAttribute("variation", new THREE.BufferAttribute(snowVariations, 1));
  const snowMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: renderer.getPixelRatio() } },
    vertexShader: `uniform float uTime,uPixelRatio;attribute float variation;varying float vOpacity;varying vec2 vDirection;
      void main(){
        float speed=.68+variation*.65;
        float gust=sin(uTime*.32)*1.8;
        vec3 velocity=vec3(.82,-.90,.34)*speed;
        vec3 p=position;
        p.x=mod(p.x+18.+uTime*velocity.x+gust,36.)-18.;
        p.z=mod(p.z+18.+uTime*velocity.z,36.)-18.;
        p.y=mod(p.y+uTime*velocity.y+1400.,14.);
        float phase=p.y*.65+uTime*.45+variation*6.283;
        p.x+=sin(phase)*.45;
        velocity.x+=cos(uTime*.32)*.576+cos(phase)*.45*(velocity.y*.65+.45);
        vec4 mv=modelViewMatrix*vec4(p,1.),clip=projectionMatrix*mv;
        vec4 motion=projectionMatrix*vec4(mat3(modelViewMatrix)*velocity,0.);
        vec2 direction=motion.xy*clip.w-clip.xy*motion.w;
        vDirection=normalize(vec2(direction.x,-direction.y));
        gl_Position=clip;
        gl_PointSize=clamp(94.*uPixelRatio*(.65+fract(variation*13.37)*.70)/-mv.z,1.,14.);
        float edges=smoothstep(0.,.8,p.y)*(1.-smoothstep(13.,14.,p.y));
        edges*=(1.-smoothstep(16.,18.,abs(p.x)))*(1.-smoothstep(16.,18.,abs(p.z)));
        vOpacity=(1.-smoothstep(12.,38.,-mv.z))*smoothstep(.6,2.5,-mv.z)*edges*(.55+variation*.25);
      }`,
    fragmentShader: `varying float vOpacity;varying vec2 vDirection;
      void main(){vec2 p=(gl_PointCoord-.5)*2.;float along=dot(p,vDirection),across=dot(p,vec2(-vDirection.y,vDirection.x));float a=1.-smoothstep(.10,1.,length(vec2(across*2.,along)));gl_FragColor=vec4(.94,.97,1.,a*vOpacity);}`,
    transparent: true, depthWrite: false,
  });
  const snow = new THREE.Points(snowGeometry, snowMaterial); snow.frustumCulled = false; scene.add(snow);

  const renderTarget = new THREE.WebGLRenderTarget(1, 1, {
    type: THREE.HalfFloatType,
    samples: mobile ? 0 : Math.min(2, renderer.capabilities.maxSamples),
  });
  const composer = new EffectComposer(renderer, renderTarget);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), .22, .32, .80);
  composer.addPass(bloom); composer.addPass(new OutputPass());
  const pointer = new THREE.Vector2(2, 2);
  const dampedPointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const cursorPoint = new THREE.Vector3(100, 100, 100);
  const dampedCursor = cursorPoint.clone();
  const cameraOffset = new THREE.Vector3();
  const interactionPlane = new THREE.Plane();
  let width = 1, height = 1, hover = false;
  let frames = 0;
  const resize = () => {
    width = canvas.clientWidth; height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.zoom = Math.min(1, camera.aspect * 1.25);
    if (width >= 520 && height <= 500) {
      const headerHeight = width < 768 ? 105 : 88;
      camera.zoom *= Math.min(.88, (height - headerHeight - 96) / (height * .55));
      camera.setViewOffset(width, height, -width * .18, -(headerHeight - 96) / 2, width, height);
    } else if (width < 520 && height < 700) {
      camera.zoom *= .8;
      camera.setViewOffset(width, height, 0, -height * .06, width, height);
    } else camera.clearViewOffset();
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false); composer.setSize(width, height);
    landscape.resize(canvas.width, canvas.height);
  };
  const render = (time: number, delta: number, reduced: boolean) => {
    const ease = reduced ? 1 : 1 - Math.exp(-delta * 2.15);
    dampedPointer.lerp(pointer.x === 2 ? new THREE.Vector2() : pointer, ease);
    cameraOffset.copy(baseCamera).sub(lookTarget);
    const spherical = new THREE.Spherical().setFromVector3(cameraOffset);
    spherical.theta += reduced ? 0 : dampedPointer.x * .11;
    spherical.phi += reduced ? 0 : dampedPointer.y * .039;
    camera.position.copy(lookTarget).add(cameraOffset.setFromSpherical(spherical));
    camera.lookAt(lookTarget);
    if (pointer.x !== 2 && !reduced) {
      raycaster.setFromCamera(pointer, camera);
      const direction = camera.getWorldDirection(new THREE.Vector3());
      interactionPlane.setFromNormalAndCoplanarPoint(direction, camera.position.clone().addScaledVector(direction, 19.25));
      raycaster.ray.intersectPlane(interactionPlane, cursorPoint);
      igloo.worldToLocal(cursorPoint);
      if (dampedCursor.x === 100) dampedCursor.copy(cursorPoint);
      else dampedCursor.lerp(cursorPoint, 1 - Math.exp(-delta * 3));
    } else dampedCursor.set(100, 100, 100);
    hover = false;
    for (const block of blocks) {
      const distance = block.base.distanceTo(dampedCursor);
      const local = reduced ? 0 : (1 - THREE.MathUtils.smoothstep(distance, 1, 3)) * THREE.MathUtils.smoothstep(block.base.y, .45, .70);
      const breath = reduced ? 0 : Math.max(0, Math.sin(time * .18 + block.id * .2)) * .012 * THREE.MathUtils.smoothstep(block.base.y, .45, .70);
      const target = local * (.28 + hash(block.id, 7) * .22) + breath;
      block.target = THREE.MathUtils.lerp(block.target, target, 1 - Math.exp(-delta * 3.7));
      block.amount = THREE.MathUtils.lerp(block.amount, block.target, 1 - Math.exp(-delta * 3.7));
      if (reduced) block.amount = block.target = 0;
      block.mesh.position.copy(block.base).multiplyScalar(1 + block.amount);
      block.mesh.rotation.set(block.amount * Math.sin(block.id) * .5, block.amount * Math.cos(block.id * .9) * .5, block.amount * Math.sin(block.id * .7) * .4);
      if (local > .2) hover = true;
    }
    snowMaterial.uniforms.uTime.value = reduced ? 0 : time;
    const displacement = Math.max(...blocks.map(block => block.amount));
    const illumination = THREE.MathUtils.smoothstep(displacement, .02, .20);
    glowMaterial.opacity = illumination * .62;
    cavityLight.intensity = illumination * 22;
    spillLight.intensity = illumination * 1.5;
    composer.render();
    if (shaderFailed) throw new Error("얼음 장면의 셰이더를 컴파일하지 못했습니다.");
    canvas.dataset.ready = "true";
    canvas.dataset.hover = String(hover);
    canvas.dataset.displacement = displacement.toFixed(3);
    canvas.dataset.frames = String(++frames);
    canvas.dataset.camera = camera.position.toArray().map(value => value.toFixed(3)).join(",");
  };
  resize();
  return {
    resize, render,
    pointer(x: number, y: number) { pointer.set(x, y); },
    pointerLeave() { pointer.set(2, 2); },
    dispose() {
      landscape.dispose();
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) object.geometry.dispose();
      });
      for (const material of [ice, photoIce, innerIce, sideIce, archInside, terrainMaterial, glowMaterial, interior.material, snowMaterial]) material.dispose();
      for (const texture of [frost, bump, terrainMap, terrainBump, snowAlbedo, surfacePlate, terrainPlate]) texture.dispose();
      sun.shadow.map?.dispose();
      composer.passes.forEach(pass => pass.dispose()); composer.dispose();
      renderer.dispose();
    },
  };
}
