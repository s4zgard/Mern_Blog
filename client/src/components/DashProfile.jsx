import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import { GoUpload } from "react-icons/go";
import "react-circular-progressbar/dist/styles.css";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const imageRef = useRef();

  const handleUpload = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setImage(imageFile);
    }
  };

  const handleImageAlert = () => {
    setUploadError(null);
  };

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadError(null);
        setUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setUploadError("Image size should not exceeds 2 MB (MegaBytes)");
        setUploadProgress(null);
        setImageUrl(null);
        setImage(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className="my-8 font-semibold text-center text-3xl">Profile</h1>
      <form className="mb-4 flex flex-col gap-4">
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleUpload}
          ref={imageRef}
        />
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          {uploadProgress && (
            <CircularProgressbar
              value={uploadProgress}
              className="w-full h-full absolute inset-0"
              strokeWidth={5}
            />
          )}
          <img
            src={imageUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 ${
              uploadProgress && uploadProgress < 100 && "opacity-60"
            }`}
          />
          <div
            onClick={() => imageRef.current.click()}
            className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80"
          >
            <GoUpload className="text-3xl text-green-500" />
          </div>
        </div>
        {uploadError && (
          <Alert onDismiss={handleImageAlert} color="failure">
            {uploadError}
          </Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button
          disabled={uploadError}
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
        >
          Update
        </Button>
        <div className="flex justify-between mt-4 text-red-500">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </form>
    </div>
  );
}
