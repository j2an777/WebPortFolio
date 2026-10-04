import { readdir, copyFile, writeFile } from "node:fs/promises";
await copyFile("out/opengraph-image", "out/opengraph-image.png");
for (const slug of await readdir("out/work")) {
  await copyFile(`out/work/${slug}/opengraph-image`, `out/work/${slug}/opengraph-image.png`);
}
await writeFile("out/.nojekyll", "");
