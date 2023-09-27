import React, { useState } from "react";
import { BsPlusCircle, BsTrash, BsX } from "react-icons/bs";
import { useModalAddPost } from "@/context/ModalCreatePostContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const ModalAddPosts = () => {
  const [fileData, setFileData] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tabs, setTabs] = useState("image");
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      setFileData(selectedFile);
    }
  };

  const { isOpenModalAddPost, setIsOpenModalAddPost } = useModalAddPost();

  const handleRemoveFile = () => {
    setFileData(null);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (caption.length === 0) {
      console.log("Caption cannot be empty!");
      return;
    }

    if (!fileData) {
      console.log("Please select an image.");
      return;
    }

    let formData = new FormData();
    formData.append("file", fileData);
    formData.append("caption", caption);

    const res = await axios.post("/api/posts", formData);

    if (res.data.success) {
      router.push(`/p/${res.data.data.id}`);
      setCaption("");
      setFileData(null);
    }

    setIsLoading(false);
    setIsOpenModalAddPost(false);
  };

  return (
    <>
      <div
        className={
          isOpenModalAddPost
            ? "backdrop-brightness-75 fixed w-full h-full  top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center"
            : "hidden"
        }
      >
        <div className="w-[90%] h-max sm:w-[50%] lg:max-w-[768px]  rounded-lg shadow md:p-10 p-5 bg-white">
          <div className="flex justify-between items-center pb-3 border-b-2">
            <h1 className="text-sm font-semibold">Create new post</h1>
            <button
              disabled={isLoading}
              className="text-2xl font-semibold"
              onClick={() => setIsOpenModalAddPost(false)}
            >
              <BsX />
            </button>
          </div>
          <div className="w-full mt-5">
            {tabs === "image" && (
              <>
                {fileData === null && (
                  <div className="w-full flex justify-center">
                    <label
                      htmlFor="files"
                      className="p-2 text-sm font-semibold rounded-md bg-sky-500 hover:bg-sky-600 text-white cursor-pointer"
                    >
                      Select an image
                    </label>
                  </div>
                )}
                {fileData !== null && (
                  <div className="w-full ">
                    <img
                      src={URL.createObjectURL(fileData)}
                      className="w-[350px] h-[280px] object-contain"
                      alt="Selected Image"
                    />

                    <div className="w-full flex gap-3 mt-5 items-center">
                      <button
                        onClick={handleRemoveFile}
                        type="button"
                        className="font-semibold py-2 px-5 bg-slate-200 rounded "
                      >
                        <BsTrash />
                      </button>
                      <button
                        onClick={() => setTabs("caption")}
                        className="disabled:opacity-70 font-semibold text-xs py-2 px-5 bg-sky-500 text-white rounded"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            {tabs === "caption" && (
              <div className="w-full mt-2">
                <label htmlFor="caption" className="text-sm">
                  Caption
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  id="caption"
                  className="w-full border focus:outline-none rounded p-2 h-[150px]"
                ></textarea>
                <div className="w-full flex gap-3 mt-5 items-center justify-between">
                  <button
                    onClick={() => setTabs("image")}
                    className="disabled:opacity-70 font-semibold text-xs py-2 px-5 bg-gray-200  rounded"
                  >
                    Back
                  </button>
                  <button
                    disabled={isLoading || caption.length === 0}
                    onClick={handleSubmit}
                    className="disabled:opacity-70 font-semibold text-xs py-2 px-5 bg-sky-500 text-white rounded"
                  >
                    {isLoading ? "Uploading..." : "Next"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <input
        type="file"
        id="files"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </>
  );
};

export default ModalAddPosts;
