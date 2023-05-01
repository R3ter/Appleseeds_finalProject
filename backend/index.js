import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import captureWebsite from "capture-website";
import multer from "multer";
import cors from "cors";
import circularJson from "circular-json";
import fs from "fs";
import path from "path";
const app = express();
const port = 3000;
const upload = multer({ dest: "uploads/", storage: multer.memoryStorage() });

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/", upload.array("images"), async (req, res) => {
  const htmlImage = await captureShot(req.files);
  const deImage = req.files[0].buffer;
  const data = { image1: htmlImage, image2: deImage };

  const compared = await axios({
    method: "post",
    url: "http://127.0.0.1:5000/process_data",
    data: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });

  res.send(compared.data.result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const captureShot = async (files) => {
  let css = "";
  let js = "";
  let html = "";
  files.forEach(async (file, index) => {
    if (index == 0) return;
    const isCSS = /\.(css)$/i.test(file.originalname);
    const isJS = /\.(js)$/i.test(file.originalname);
    const isHtml = /\.(html)$/i.test(file.originalname);
    if (isHtml) {
      html = file.buffer.toString("utf-8");
    }
    if (isCSS) {
      css += file.buffer.toString("utf-8");
    }
    if (isJS) {
      js += file.buffer.toString("utf-8");
    }
  });
  return await captureWebsite.buffer(html, {
    inputType: "html",
    delay: 2,
    styles: [css],
  });
};
