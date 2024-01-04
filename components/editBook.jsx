"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MyModal from "./modal";
import { edit_book } from "../app/serverAction/editAction";
import MyButton, { Button } from "./button";
import UploadBookImage from "./uploadImg";
import { v4 } from "uuid";
import { storage } from "../app/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function EditBook({ book }) {
  const [contentOwner, setContentOwner] = useState(book.contentOwner.name);
  const [publisher, setPublisher] = useState(book.publisher.name);
  const [bookName, setBookName] = useState(book.bookname);
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState("");
  const handleSave = async (url) => {
    await edit_book({
      idx: book.idx,
      name: bookName,
      coverImage: url,
      contentOwner: contentOwner,
      publisher: publisher,
      co_id: book.co_id,
      pu_id: book.publisher_id,
    })
      .then(() => router.push("https://wzdata-three.vercel.app/book_list"))
      .catch(() => {
        setIsError(true);
        setIsSaving(false);
      });
  };
  async function handleUploadImageToFirebase() {
    const fileName = `wzImg/${image?.name + v4()}`;
    const imageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(imageRef, image);
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
          handleSave(url);
          //url is the actual path for a video that anyone can access in browser
        });
      }
    );
  }
  return (
    <main className="  bg-yellow-50 flex w-[100vw] h-[85vh] justify-center items-center flex-col ">
      {isError && (
        <i className="text-red-500 italic text-lg my-5">
          Something went wrong try again
        </i>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSaving(true);
          handleUploadImageToFirebase();
        }}
        className=" rounded-lg flex justify-center items-center flex-col bg-yellow-200 w-fit p-10 h-auto"
      >
        <section className=" w-full h-full flex flex-row justify-center">
          <UploadBookImage setImage={setImage} book={book} />
          {/* lables */}

          <div className="flex justify-center items-center flex-col">
            <label className=" font-bold text-xl w-[40vw] text-start mt-3">
              Book name
            </label>
            <input
              required
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              type="text"
              className=" text-lg outline-none border border-cyan-500 rounded-lg w-[40vw] p-3 mx-6"
            />

            <label className=" font-bold text-xl w-[40vw] text-start mt-3">
              Publisher
            </label>
            <input
              required
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              type="text"
              className=" text-lg outline-none border border-cyan-500 rounded-lg w-[40vw] p-3 mx-6"
            />

            <label className=" font-bold text-xl w-[40vw] text-start mt-3">
              Content owner
            </label>
            <input
              required
              value={contentOwner}
              onChange={(e) => setContentOwner(e.target.value)}
              type="text"
              className=" text-lg outline-none border border-cyan-500 rounded-lg w-[40vw] p-3 mx-6"
            />
          </div>
        </section>

        <div className="flex justify-between items-center w-full">
          <MyButton
            buttonName={"back"}
            className="p-4 mt-4 rounded-md bg-neutral-900 text-white text-sm cursor-pointer"
            onclick={() => router.back()}
          />
          {bookName && contentOwner && publisher && (
            <Button
              buttonName={"save"}
              className="p-4 mt-4 rounded-md bg-neutral-900 text-white text-sm "
            />
          )}
        </div>
      </form>
      {isSaving && (
        <MyModal>
          <h1 className="text-[100px] text-white">Saving...</h1>
        </MyModal>
      )}
    </main>
  );
}
