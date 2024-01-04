import Image from "next/image";
import { useRef, useState } from "react";

export default function UploadBookImage({ setImage, book }) {
  const [coverImage, setCoverImage] = useState("");
  const uploadRef = useRef(0);
  const handleUpload = () => {
    uploadRef?.current?.click();
  };
  return (
    <div className="relative flex justify-center flex-col items-center">
      <p className="text-[20px] text-white">Choose an image</p>

      <Image
        src={coverImage ? URL.createObjectURL(coverImage) : book.cover_photo}
        width={400}
        height={400}
        className=" h-[300px] w-[300px] rounded-full object-cover bg-white"
        alt="image"
      />

      <Image
        onClick={() => handleUpload()}
        src={"/edit.svg"}
        width={100}
        height={100}
        alt="edit"
        className=" w-10 h-10 absolute top-0 right-0 cursor-pointer"
      />
      <input
        type="file"
        accept="image/*"
        //   value={coverImage}
        className=" hidden"
        ref={uploadRef}
        onChange={(e) => {
          setCoverImage(e.target.files[0]);
          setImage(e.target.files[0]);
        }}
      />
    </div>
  );
}
