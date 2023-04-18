import FileUploader from "../components/FileUploader/FileUploader";
import Header from "../components/Header/Header";

export default () => {
  return (
    <div>
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
        <FileUploader />
        <FileUploader />
      </div>
    </div>
  );
};
