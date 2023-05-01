import { useRef, useState } from "preact/hooks";
import FileUploader from "../components/FileUploader/FileUploader";
import Header from "../components/Header/Header";
import { Button } from "@mui/material";

export default () => {
  const [url, setImage] = useState("");
  const files = useRef([]);
  const image = useRef([]);
  return (
    <div>
      <img src={url} width={500} height={500} />
      <Header />
      <div
        style={{
          width: "100%",
          height: 300,
          margin: 0,
          padding: 0,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FileUploader value={files} title="code folder" directory />
        <FileUploader value={image} title="design image" />
        <Button
          onClick={async () => {
            const formData = new FormData();
            files.current = Object.values(files.current);
            formData.append("images", image.current[0]);
            files.current.forEach((element) => {
              formData.append("images", element);
            });
            // formData.append("images", files);
            const res = await fetch("http://127.0.0.1:3000/", {
              method: "POST",
              body: formData,
            }).then(async (e) => await e.text());
            setImage(res);
          }}
        >
          submit
        </Button>
      </div>
    </div>
  );
};
