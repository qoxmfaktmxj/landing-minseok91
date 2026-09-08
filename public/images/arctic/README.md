# Arctic scene assets

The runtime uses five local WebP textures derived from CC0 assets by Rob Tuytel at Poly Haven:

- Rough Plaster 03: diffuse and OpenGL normal maps for fine irregular frost surface detail.
- Aerial Rocks 02: diffuse and OpenGL normal maps for terrain relief.
- Snow 02: diffuse map for snow coverage over the terrain.

Sources and checksums are recorded in provenance.json. [Poly Haven license](https://polyhaven.com/license).

돔 블록, 입구, 지형, 눈, 카메라와 상호작용은 이 프로젝트에서 직접 구현했다. 원본 사이트의 모델, 텍스처와 배포 코드는 포함하지 않는다. 기존 arctic-hero.webp는 그래픽 오류, 모션 감소, JavaScript 비활성 환경의 정적 대체 화면에서만 사용한다.

생성된 surface-plate-six.webp의 초기 투영 좌표를 블록에 저장해 움직이는 동안에도 표면 결이 붙어 있게 한다. 이미지의 큰 명암과 미세한 결을 분리하고, 현재 표면 법선과 조명으로 얼음의 굴곡을 표현한다. 블록이 벌어지면 서리 가장자리와 내부 빛이 함께 반응한다. 생성 프롬프트와 체크섬은 provenance.json, surface-plate-six.webp.json에 기록되어 있다.

The generated terrain-light-ridges.webp adds wind-scoured snow and baked light to the actual terrain meshes, including overlapping low middle ridges. A fixed 52-degree world-space projector keeps the material attached during camera movement, including newly visible slopes. Areas outside its view blend into the existing procedural material. Real-time shadows remain active.

Runtime loads the five CC0 derivatives and the two generated material plates. Intermediate procedural experiments, the older five-course plate and original JPEG sources are preserved in the local `.omx/fidelity-90/landing/asset-archive/` research archive; its manifest records verified SHA256 hashes. Published asset provenance includes the original source URLs and checksums.

터치 중심 기기에서는 `mobile/`의 1024px 텍스처 5장을 사용하고, 생성된 재질 이미지 2장은 원본을 공유한다. 텍스처 총용량은 데스크톱 8,610,752바이트, 모바일 2,107,546바이트다. 모바일 파일은 위 CC0 원본의 축소본이며 `node scripts/build-arctic-mobile-textures.mjs`로 다시 생성할 수 있다. 색상 맵은 WebP 품질 82, 노멀 맵은 품질 90으로 저장한다.

눈발은 별도 이미지 없이 GPU에서 움직인다. PC 1,200개, 모바일 600개의 입자에 거리별 크기, 투명도, 돌풍과 흔들림을 적용한다. PC는 후처리 렌더 타깃에 최대 2샘플 MSAA를 적용하고, 모바일은 기존 해상도와 그림자 제한을 유지한다.

블록의 초기 중심 높이와 모델 행렬에서 벌어짐을 계산하므로 매 프레임 움직임 값을 정점 버퍼로 전송하지 않는다. GPU 복구 시에는 보관된 텍스처와 장면을 다시 사용하며, 셰이더 실패 시 정적 배경으로 전환한다. `npm run test:performance`는 PC와 모바일 에뮬레이션에서 각각 30초씩 3회 측정하고 `.impeccable/review/arctic-performance.json`에 프레임 시간과 버퍼 전송량을 기록한다. 실제 휴대폰 성능 측정과는 구분한다.

등장의 윤곽선은 기존 블록의 UV 경계와 높이를 셰이더에서 계산한다. 주변 연결망은 코드로 만든 정적 선분이며 등장 후 숨긴다. 자동 움직임과 이름 글리치에도 새 이미지나 모델을 다운로드하지 않는다. 원본 사이트의 공개 배포 코드에서 동작 방식을 참고했으며, 원본의 DRC 모델과 KTX2 텍스처는 이 프로젝트에 포함하지 않는다.

윤곽선 미리보기는 텍스처 다운로드와 분리한다. 텍스처를 모두 받기 전까지 카메라, 눈, 블록과 등장 진행률을 고정하고 추가 애니메이션 프레임을 요청하지 않는다. 다운로드 후 같은 장면에서 등장 연출을 이어간다. 정상 진입에서는 arctic-hero.webp를 요청하지 않는다.

3D 코드 로딩 전에는 실제 첫 프레임을 캡처한 arctic-loading-desktop.webp 또는 arctic-loading-mobile.webp를 사용한다. 각각 61,820바이트, 28,476바이트이며 화면에 해당하는 파일만 요청한다. 두 이미지는 텍스처를 모두 대기시킨 자체 장면에서 `scripts/capture-arctic-loading.mjs`로 생성한다. 별도 구도를 사용하는 작은 세로 화면과 가로 화면에서는 단색 배경에서 3D 윤곽선으로 전환한다.
