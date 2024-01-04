"use client";
// import { storage } from "@/app/firebase";
// import { revalidateBookList } from "@/app/serverAction/createBookAction";
// import MyButton, { Button } from "@/components/button";
// import MyModal from "@/components/modal";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import { revalidateBookList } from "../../serverAction/createBookAction";
import MyButton, { Button } from "../../../components/button";
import MyModal from "../../../components/modal";

export default function CreateNow() {
  const [coverImage, setCoverImage] = useState("");
  const [submiting, setSubmiting] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const uploadRef = useRef(0);
  const handleUpload = () => {
    uploadRef?.current?.click();
  };
  const params = useSearchParams();
  const publisher = params.get("publisher");
  const contentOwner = params.get("contentOwner");
  const bookName = params.get("bookName");

  const createBook = async (url) => {
    console.log("creating: ", url);
    const response = await axios.post(
      "https://wzdata-three.vercel.app/api/book/",
      {
        contentOwner: contentOwner,
        bookName: bookName,
        publisher: publisher,
        coverImage: url,
      }
    );
    if (response.status === 200) {
      revalidateBookList();
      router.push("https://wzdata-three.vercel.app/book_list");
      console.log("end");
    } else {
      setSubmiting(false);
      setIsError(true);
    }
  };

  async function handleUploadImageToFirebase() {
    const fileName = `wzImg/${coverImage?.name + v4()}`;
    const imageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(imageRef, coverImage);
    // set up an event listener to track upload progress

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percent + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          createBook(url);
          //url is the actual path for a video that anyone can access in browser
        });
      }
    );
  }
  const handleFinish = () => {
    if (coverImage) {
      setSubmiting(true);
      handleUploadImageToFirebase(coverImage);
    }
  };

  return (
    <main className="w-[100%] bg-yellow-50 h-[85vh] overflow-hidden flex justify-start mt-4 items-center flex-col">
      {isError && (
        <p className=" italic text-red-500 mx-10">
          something went wrong try again
        </p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFinish();
        }}
        className=" rounded-lg flex justify-center items-center flex-col bg-yellow-300 w-[50vw] py-5 h-auto"
      >
        <div className="relative flex justify-center flex-col items-center">
          <p className="text-[27px] text-white">Choose an image</p>
          {!coverImage ? (
            <div className=" h-[300px] w-[300px] rounded-full object-cover border bg-slate-400"></div>
          ) : (
            <Image
              src={URL.createObjectURL(coverImage)}
              width={400}
              height={400}
              className=" h-[300px] w-[300px] rounded-full object-cover"
              alt="image"
            />
          )}
          <Image
            onClick={handleUpload}
            src={"/edit.svg"}
            width={100}
            height={100}
            alt="edit"
            className=" w-10 h-10 absolute top-0 right-0 cursor-pointer"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          //   value={coverImage}
          className=" hidden"
          ref={uploadRef}
          onChange={(e) => setCoverImage(e.target.files[0])}
        />
        <div className="w-full flex justify-between items-center">
          <MyButton
            onclick={() => router.back()}
            buttonName={"back"}
            className="rounded-md mx-10 "
          />
          {coverImage && <Button buttonName={"Finish"} className="mx-10" />}
        </div>
      </form>
      {submiting && (
        <MyModal>
          <h1 className="text-[100px] text-white">Creating...</h1>
        </MyModal>
      )}
    </main>
  );
}
