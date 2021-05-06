import "./App.css";
import React, { useState } from "react";

function App() {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [imgName, setImgName] = useState("");
  const [imgurl, setImgurl] = useState("");

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
    fetchImgJSON(previewSource)
      .then((img) => {
        console.log(img);
        setImgurl(img.secure_url);
      })
      .catch((error) => console.error(error));
  };

  const handleNameChange = (e) => {
    const imgName = e.target.value;
    setImgName(imgName);
  };

  // const uploadImg = async (base64EncodedImage) => {
  //   console.log(base64EncodedImage);
  //   try {
  //     const response = await fetch("http://localhost:8000/api/upload", {
  //       method: "POST",
  //       body: JSON.stringify({ data: (base64EncodedImage) }),
  //       headers: { "Content-type": "application/json" },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  async function fetchImgJSON(base64EncodedImage) {
    const response = await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      body: JSON.stringify({ data: base64EncodedImage }),
      headers: { "Content-type": "application/json" },
    });
    const itemImg = await response.json();
    return itemImg;
  }
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

        <div>
          {previewSource && (
            <img
              src={previewSource}
              alt="chosen-img"
              style={{ height: "300px" }}
            />
          )}
        </div>
        <label htmlFor="img-name">Name your image</label>
        <input type="text" name="imgName" onChange={handleNameChange} />
        <button className="form-btn" type="submit">
          Submit
        </button>
      </form>
      <img src="http://res.cloudinary.com/dj4cj4ori/image/upload/v1620161195/payitforward-items/kfmdp3xzgfk3ne5xtzwd.png" />
    </div>
  );
}

export default App;
