# Arctic scene assets

The runtime uses five local WebP textures derived from CC0 assets by Rob Tuytel at Poly Haven:

- Rough Plaster 03: diffuse and OpenGL normal maps for fine irregular frost surface detail.
- Aerial Rocks 02: diffuse and OpenGL normal maps for terrain relief.
- Snow 02: diffuse map for snow coverage over the terrain.

Sources and checksums are recorded in provenance.json. [Poly Haven license](https://polyhaven.com/license).

The dome blocks, tunnel, terrain, snow simulation, camera response and object interaction are independently authored. No Igloo website model, texture, or compiled application code is packaged in this scene. The earlier generated arctic-hero.webp remains only the unsupported-WebGL and JavaScript-disabled fallback.

생성된 surface-plate-six.webp의 초기 투영 좌표를 블록에 저장해 움직이는 동안에도 표면 결이 붙어 있게 한다. 이미지의 큰 명암과 미세한 결을 분리하고, 현재 표면 법선과 조명으로 얼음의 굴곡을 표현한다. 블록이 벌어지면 서리 가장자리와 내부 빛이 함께 반응한다. 생성 프롬프트와 체크섬은 provenance.json, surface-plate-six.webp.json에 기록되어 있다.

The generated terrain-light-ridges.webp adds wind-scoured snow and baked light to the actual terrain meshes, including overlapping low middle ridges. A fixed 52-degree world-space projector keeps the material attached during camera movement, including newly visible slopes. Areas outside its view blend into the existing procedural material. Real-time shadows remain active.

Runtime loads the five CC0 derivatives and the two generated material plates. Intermediate procedural experiments, the older five-course plate and original JPEG sources are preserved in the local `.omx/fidelity-90/landing/asset-archive/` research archive; its manifest records verified SHA256 hashes. Published asset provenance includes the original source URLs and checksums.

터치 중심 기기에서는 `mobile/`의 1024px 텍스처 5장을 사용하고, 생성된 재질 이미지 2장은 원본을 공유한다. 텍스처 총용량은 데스크톱 8,610,752바이트, 모바일 2,107,546바이트다. 모바일 파일은 위 CC0 원본의 축소본이며 `node scripts/build-arctic-mobile-textures.mjs`로 다시 생성할 수 있다. 색상 맵은 WebP 품질 82, 노멀 맵은 품질 90으로 저장한다.

눈발은 별도 이미지 없이 GPU에서 움직인다. PC 1,200개, 모바일 600개의 입자에 거리별 크기, 투명도, 돌풍과 흔들림을 적용한다. PC는 후처리 렌더 타깃에 최대 2샘플 MSAA를 적용하고, 모바일은 기존 해상도와 그림자 제한을 유지한다.
