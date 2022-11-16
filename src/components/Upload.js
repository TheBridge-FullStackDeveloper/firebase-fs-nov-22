import { Button } from "@mui/material";
import { storage } from "../services/storage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { useState } from "react";

const Upload = ({ onUploadFinished }) => {
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];

    if (file.size > 1024 * 10000) {
      throw new Error("image is to big");
    }

    const storageRef = ref(storage, `imgs/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          onUploadFinished(downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" />
        <Button type="submit">Upload</Button>
      </form>
      <CircularProgressWithLabel value={progress} />
      {imageUrl && <img src={imageUrl} alt="my_image" />}
    </div>
  );
};

export default Upload;
