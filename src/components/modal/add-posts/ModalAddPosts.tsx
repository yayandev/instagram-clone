import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsPlusCircle, BsTrash, BsX } from "react-icons/bs";
import React, { useState, useRef } from "react";
import { useModalAddPost } from "@/context/ModalCreatePostContext";
import axios from "axios";
import Spinner from "@/components/spinner/Spinner";
import { useRouter } from "next/navigation";

interface FileData {
  file: File;
  preview: string;
}

const ModalAddPosts = () => {
  const [fileData, setFileData] = useState<FileData[]>([]);
  const [tabs, setTabs] = useState<string>("image");
  const [caption, setCaption] = useState("");
  const [msg, setMsg] = useState("");
  const [notif, setNotif] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);

    const updatedFileData: FileData[] = [...fileData];

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        updatedFileData.push({ file, preview: reader.result as string });
        setFileData(updatedFileData);
      };
      reader.readAsDataURL(file);
    });
  };

  const [isDeleted, setIsDeleted] = useState(false);

  let imageSliderRef: any = useRef<Slider | null>(null);

  const { isOpenModalAddPost, setIsOpenModalAddPost } = useModalAddPost();

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleRemoveFile = (index: number) => {
    const updatedFileData: FileData[] = [...fileData];
    updatedFileData.splice(index, 1);
    setFileData(updatedFileData);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (caption.length === 0) {
      setMsg("Caption cannot be empty!");
      return;
    }

    let formData = new FormData();

    for (let i = 0; i < fileData.length; i++) {
      formData.append("files", fileData[i].file);
    }

    formData.append("caption", caption);
    const res = await axios.post("/api/posts", formData);

    if (res.data.success) {
      router.refresh();
      setMsg(res.data.message);
      setNotif("text-green-500");
      setIsLoading(false);
      setIsOpenModalAddPost(false);
      setTabs("image");
      setMsg("");
      setNotif("");
      setCaption("");
      setFileData([]);
    } else {
      setIsLoading(false);
      setMsg(res.data.message);
      setNotif("text-red-500");
    }
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
            {tabs === "image" && (
              <>
                <h1 className="text-sm font-semibold">Create new post</h1>
                <button
                  className="text-2xl font-semibold"
                  onClick={() => setIsOpenModalAddPost(false)}
                >
                  <BsX />
                </button>
              </>
            )}
            {tabs === "caption" && (
              <>
                <button
                  disabled={isLoading}
                  onClick={() => setTabs("image")}
                  className="disabled:opacity-70 font-semibold text-xs p-2 px-5 bg-slate-200 rounded"
                >
                  Back
                </button>
                <button
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="disabled:opacity-70 font-semibold text-xs p-2 px-5 bg-sky-500 text-white rounded"
                >
                  {isLoading ? <Spinner /> : "Share"}
                </button>
              </>
            )}
          </div>
          <div className="w-full mt-5">
            {fileData.length === 0 && tabs === "image" && (
              <div className="w-full flex justify-center">
                <label
                  htmlFor="files"
                  className="p-2 text-sm font-semibold rounded-md bg-sky-500 hover:bg-sky-600 text-white cursor-pointer"
                >
                  Select from library
                </label>
              </div>
            )}
            {tabs === "caption" && (
              <div className="w-full">
                <label htmlFor="caption" className="font-semibold text-sm">
                  Caption
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  name="caption"
                  id="caption"
                  className="w-full p-3 rounded border focus:outline-none h-[150px]"
                ></textarea>
              </div>
            )}
            {fileData.length > 0 && tabs === "image" && (
              <div className="w-full ">
                <div className="w-full flex justify-center">
                  <Slider
                    className="w-[350px] h-[350px] border-2 p-3"
                    {...settings}
                    ref={imageSliderRef}
                  >
                    {fileData.map((image: any, index: number) => (
                      <div key={index}>
                        <img
                          src={image.preview}
                          className="w-[350px] h-[280px] object-contain"
                          alt={`Image ${index}`}
                        />

                        <button
                          onClick={() => handleRemoveFile(index)}
                          type="button"
                          className="disabled:opacity-70 mt-3 font-semibold py-2 px-5 bg-slate-200 rounded "
                        >
                          <BsTrash />
                        </button>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="w-full mt-2 flex justify-end gap-2">
                  {fileData.length !== 5 && (
                    <label
                      htmlFor="files"
                      className="cursor-pointer font-semibold text-xs p-2 px-5 bg-slate-200 rounded"
                    >
                      <BsPlusCircle />
                    </label>
                  )}
                  <button
                    onClick={() => setTabs("caption")}
                    className="font-semibold text-xs p-2 px-5 bg-slate-200 rounded"
                  >
                    Next
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
        multiple
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
    </>
  );
};

export default ModalAddPosts;
