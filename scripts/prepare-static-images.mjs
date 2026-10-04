import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
const directory = "public/images";
await mkdir(`${directory}/responsive`, { recursive: true });
for (const file of await readdir(directory)) {
  if (!file.endsWith(".webp")) continue;
  for (const width of [256, 384, 640, 750, 828, 1080, 1200, 1920]) {
    await sharp(path.join(directory, file)).resize({ width, withoutEnlargement: true }).webp({ quality: 75 })
      .toFile(path.join(directory, "responsive", `${path.parse(file).name}-${width}.webp`));
  }
}
