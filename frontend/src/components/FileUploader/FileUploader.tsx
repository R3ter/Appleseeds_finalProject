import { Button } from "@mui/material";
import { useState } from "preact/hooks";

export default () => {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div style={{ backgroundColor: "gray", width: "45%" }}>
      {!selectedImage && "upload Image"}
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            height={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
      <br />
      <Button>
        <input
          type="file"
          name="myImage"
          onChange={(event: any) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
          hidden
        />
      </Button>
    </div>
  );
};
