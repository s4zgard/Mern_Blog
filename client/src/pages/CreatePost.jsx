import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  FileInput,
  Select,
  TextInput,
  Spinner,
  Alert,
} from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageProgress, setImageProgress] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleUpload = async () => {
    try {
      if (!file) {
        setImageError("please select an image.");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageProgress(progress.toFixed(0));
        },
        (error) => {
          setImageError("Image upload failed");
          setImageProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageProgress(null);
            setImageError(null);
            setFormData({ ...formData, image: downloadUrl });
          });
        }
      );
    } catch (error) {
      setImageError("Image upload failed");
      setImageProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return;
    if (!formData.content) {
      setPublishError("Please write blog content.");
      return;
    }
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl min-h-screen mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7">Create Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <TextInput
            type="text"
            title="title"
            id="title"
            placeholder="Title"
            required
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">ReactJs</option>
            <option value="nodejs">NodeJs</option>
          </Select>
        </div>
        <div className="flex border-4 border-dashed border-teal-500 p-3 justify-between items-center gap-2 ">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={imageProgress}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUpload}
            disabled={imageProgress}
          >
            {imageProgress ? (
              <>
                <Spinner size="sm" />
                <span> Uploading {imageProgress}%</span>
              </>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageError && (
          <Alert onDismiss={() => setImageError(null)} color="failure">
            {imageError}
          </Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="Cover image "
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write blog post"
          className="h-72 mb-12 dark:text-gray-400"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && (
          <Alert color="failure" onDismiss={() => setPublishError(null)}>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
