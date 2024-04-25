import { Alert, Button, Modal, Spinner, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import { GoUpload } from "react-icons/go";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import "react-circular-progressbar/dist/styles.css";
import {
  userUpdateStart,
  userUpdateFailure,
  userUpdateSuccess,
  userDeleteStart,
  userDeleteFailure,
  userDeleteSuccess,
} from "../store";

export default function DashProfile() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  const [showPassForm, setShowPassForm] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [updateError, setUpdateError] = useState(null);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handeDeleteUser = async (e) => {
    setShowModal(false);
    try {
      dispatch(userDeleteStart);
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(userDeleteFailure(data.message));
      } else {
        dispatch(userDeleteSuccess());
      }
    } catch (error) {
      dispatch(userDeleteFailure(error.message));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username === "" || !formData.email === "") {
      return;
    }
    if (Object.keys(formData).length === 0 || !formData) return;
    dispatch(userUpdateStart());
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(userUpdateFailure(data.message));
        setUpdateError(data.message);
      } else {
        dispatch(userUpdateSuccess(data));
        setUpdateSuccess("Profile updated successfull.");
      }
    } catch (error) {
      dispatch(userUpdateFailure(error.message));
    }
  };

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
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        window.localStorage.clear();
        window.location.reload();
      }
      if (!res.ok) {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className="my-8 font-semibold text-center text-3xl">Profile</h1>
      <form className="mb-4 flex flex-col gap-4" onSubmit={handleSubmit}>
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
          required
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          required
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <span
          className="cursor-pointer text-xs underline"
          onClick={() => setShowPassForm(!showPassForm)}
        >
          Change Password
        </span>
        {showPassForm && (
          <TextInput
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
        )}
        <Button
          disabled={uploadError || isLoading}
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
        >
          {isLoading ? (
            <>
              {" "}
              <Spinner size="sm" /> <span className="pl-3">Updating...</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
        {currentUser.isAdmin && (
          <Link to="create-post">
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="w-full"
            >
              Create Post
            </Button>
          </Link>
        )}
        {updateSuccess && (
          <Alert onDismiss={() => setUpdateSuccess(null)} color="success">
            {updateSuccess}
          </Alert>
        )}
        {error && <Alert color="failure">{error}</Alert>}
        {updateError && (
          <Alert onDismiss={() => setUpdateError(null)} color="failure">
            {updateError}
          </Alert>
        )}
        <div className="flex justify-between mt-4 text-red-500">
          <span className="cursor-pointer" onClick={() => setShowModal(true)}>
            Delete Account
          </span>
          <span className="cursor-pointer" onClick={handleSignOut}>
            Sign Out
          </span>
        </div>
      </form>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-red-400 mb-4 mx-auto dark:text-red-200" />
            <h3 className="mb-5 text-lg text-red-500 dark:text-red-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex gap-4 justify-center">
              <Button color="failure" onClick={handeDeleteUser}>
                Yes
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
