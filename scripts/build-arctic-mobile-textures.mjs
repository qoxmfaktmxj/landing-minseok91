import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = new URL("../public/images/arctic/", import.meta.url);
const output = new URL("mobile/", source);
await mkdir(output, { recursive: true });

for (const file of [
  "rough_plaster_03-diffuse.webp",
  "rough_plaster_03-nor_gl.webp",
  "aerial_rocks_02-diffuse.webp",
  "aerial_rocks_02-nor_gl.webp",
  "snow_02-diffuse.webp",
]) {
  await sharp(fileURLToPath(new URL(file, source)))
    .resize(1024, 1024)
    .webp({ quality: file.includes("nor_gl") ? 90 : 82, effort: 6 })
    .toFile(fileURLToPath(new URL(file, output)));
}
