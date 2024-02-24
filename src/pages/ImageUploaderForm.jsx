import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ImageUploader = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  console.log(uploadedImages)

  const perset_key = "myPreset";
  const cloud_name = "dz88wbaks";

  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();

    acceptedFiles.map((file) => {
      formData.append("file", file);
      formData.append("upload_preset", perset_key);
    });

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update state with uploaded image URLs from Cloudinary
      setUploadedImages((prevImages) => [
        ...prevImages,
        response.data.secure_url,
      ]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some images here, or click to select files</p>
      </div>
      <div>
        <h4>Uploaded Images:</h4>
        <ul>
          {uploadedImages.map((imageUrl, index) => (
            <li key={index}>
              <img
                src={imageUrl}
                alt={`Uploaded ${index + 1}`}
                style={imageStyle}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const imageStyle = {
  maxWidth: "100px",
  maxHeight: "100px",
  margin: "5px",
};

export default ImageUploader;
