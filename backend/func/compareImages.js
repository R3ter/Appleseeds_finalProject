import cv from "@u4/opencv4nodejs";

const img1 = cv.imread("screenshots/www.google.com.png");
const img2 = cv.imread("screenshots/www.google.com.png");

if (img1.sizes !== img2.sizes) {
  console.error("Images do not have the same dimensions");
  process.exit(1);
}

const diffImg = new cv.Mat();
cv.absdiff(img1, img2, diffImg);

const threshold = 30;
const thresholdImg = new cv.Mat();
cv.threshold(diffImg, thresholdImg, threshold, 255, cv.THRESH_BINARY);

const numDiffPixels = thresholdImg.countNonZero();

console.log(`Number of different pixels: ${numDiffPixels}`);
