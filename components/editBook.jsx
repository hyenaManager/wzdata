"use client";

// import { edit_book } from "@/app/serverAction/editAction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MyModal from "./modal";
import { edit_book } from "../app/serverAction/editAction";
import MyButton, { Button } from "./button";

export default function EditBook({ book }) {
  const [contentOwner, setContentOwner] = useState(book.contentOwner.name);
  const [publisher, setPublisher] = useState(book.publisher.name);
  const [bookName, setBookName] = useState(book.bookname);
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleSave = async () => {
    await edit_book({
      idx: book.idx,
      name: bookName,
      coverImage: book.cover_photo,
      contentOwner: contentOwner,
      publisher: publisher,
      co_id: book.co_id,
      pu_id: book.publisher_id,
    })
      .then(() => router.push("http://localhost:3000/book_list"))
      .catch(() => setIsError(true));
  };
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
          handleSave();
        }}
        className=" rounded-lg flex justify-center items-center flex-col bg-yellow-200 w-[60vw] p-10 h-auto"
      >
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
