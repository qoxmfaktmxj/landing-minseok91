# Arctic scene assets

The runtime uses five local WebP textures derived from CC0 assets by Rob Tuytel at Poly Haven:

- Rough Plaster 03: diffuse and OpenGL normal maps for fine irregular frost surface detail.
- Aerial Rocks 02: diffuse and OpenGL normal maps for terrain relief.
- Snow 02: diffuse map for snow coverage over the terrain.

Sources and checksums are recorded in provenance.json. [Poly Haven license](https://polyhaven.com/license).

The dome blocks, tunnel, terrain, snow simulation, camera response and object interaction are independently authored. No Igloo website model, texture, or compiled application code is packaged in this scene. The earlier generated arctic-hero.webp remains only the unsupported-WebGL and JavaScript-disabled fallback.

The generated surface-plate-six.webp adds photographic frost on the actual meshes. Its initial-pose projection is stored per vertex, so the material stays attached when a block moves. Base normals control directional grading and per-block displacement controls the changing frost light. The source prompt and checksum are included in provenance.json and surface-plate-six.webp.json.

The generated terrain-light-ridges.webp adds wind-scoured snow and baked light to the actual terrain meshes, including overlapping low middle ridges. A fixed 52-degree world-space projector keeps the material attached during camera movement, including newly visible slopes. Areas outside its view blend into the existing procedural material. Real-time shadows remain active.

Runtime loads the five CC0 derivatives and the two generated material plates. Intermediate procedural experiments, the older five-course plate and original JPEG sources are preserved in the local `.omx/fidelity-90/landing/asset-archive/` research archive; its manifest records verified SHA256 hashes. Published asset provenance includes the original source URLs and checksums.
