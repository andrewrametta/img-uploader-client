import "./App.css";
import React, { useState } from "react";

function App() {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    //convert img to url
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImg(previewSource);
  };

  const uploadImg = (base64EncodedImage) => {
    console.log(base64EncodedImage);
  };
  return (
    <div className="App">
      <h1>Pretty Please work</h1>
      <form onSubmit={handleSubmitFile}>
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        <button className="form-btn" type="submit">
          Submit
        </button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen-img" style={{ height: "300px" }} />
      )}
    </div>
  );
}

export default App;
