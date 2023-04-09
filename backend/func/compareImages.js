import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs/browser.js";

const img1 = PNG.sync.read(fs.readFileSync("screenshots/www.google.com.png"));
const img2 = PNG.sync.read(fs.readFileSync("screenshots/www.google.com.png"));
const { width, height } = img1;
const diff = new PNG({ width, height });

pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

fs.writeFileSync("diff.png", PNG.sync.write(diff));
