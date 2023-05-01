import { Button } from "@mui/material";
import { useState } from "preact/hooks";

export default ({
  directory,
  title,
  value,
}: {
  directory?: boolean;
  title: string;
  value: { current: string[] };
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div
      style={{
        width: "45%",
        height: "400px",
      }}
    >
      {title}
      <div
        style={{
          backgroundColor: "gray",
          width: "100%",
          height: "100%",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: !selectedImage
            ? null
            : `url(${URL.createObjectURL(selectedImage)})`,
        }}
      >
        {selectedImage && (
          <div>
            <br />
            <Button
              variant="contained"
              color="error"
              onClick={() => setSelectedImage(null)}
            >
              Remove
            </Button>
          </div>
        )}
        <br />
        <br />
        {!selectedImage && (
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              name="myImage"
              webkitdirectory={directory}
              onChange={(event) => {
                console.log(event.target.files);
                if (!directory) setSelectedImage(event.target.files[0]);
                value.current = event.target.files;
              }}
              hidden
            />
          </Button>
        )}
      </div>
    </div>
  );
};
