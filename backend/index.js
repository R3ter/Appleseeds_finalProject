import puppeteer from "puppeteer";
import fs from "fs";
import compareImages from "./func/compareImages.js";

const takeScreenshot = async (url, outputFilePath) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const screenshotBuffer = await page.screenshot();
  await browser.close();
  fs.writeFileSync("screenshots/" + outputFilePath, screenshotBuffer);
  return "screenshots/" + outputFilePath;
};

const image = takeScreenshot("https://www.google.com", "www.google.com.png");

compareImages(image, image);
