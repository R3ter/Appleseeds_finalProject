import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import captureWebsite from "capture-website";
import multer from "multer";
import fs from "fs";
import path from "path";
const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ dest: "uploads/", storage });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/", upload.array("images"), async (req, res) => {
  captureShot(req.files);
  const data = { image1: req.files[0].buffer, folder: req.files };
  // const compared = await axios({
  //   method: "post",
  //   url: "http://127.0.0.1:5000/process_data",
  //   data: JSON.stringify(data),
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // });
  // res.send(compared.data);
  res.send("adw");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const captureShot = async (files) => {
  const directoryPath = path.resolve(path.join("path"));

  files.forEach(async (file) => {
    console.log(file);
    if (path.extname(file.fieldname) === ".html") {
      const screenshotPath = `${directoryPath}/${path.basename(
        file,
        ".html"
      )}.png`;
      const image = await captureWebsite.buffer("<h1>waleed</h1>");
      
    }
  });
};
