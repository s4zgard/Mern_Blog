import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, FileInput, Select, TextInput } from "flowbite-react";

export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl min-h-screen mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7">Create Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <TextInput
            type="text"
            title="title"
            id="title"
            placeholder="Title"
            required
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">ReactJs</option>
            <option value="nodejs">NodeJs</option>
          </Select>
        </div>
        <div className="flex border-4 border-dashed border-teal-500 p-3 justify-between items-center gap-2 ">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write blog post"
          className="h-72 mb-12 dark:text-gray-400"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
}
