"use client";

import Link from "next/link";
import { useState } from "react";

export default function CreateBook() {
  const [contentOwner, setContentOwner] = useState("");
  const [publisher, setPublisher] = useState("");
  const [bookName, setBookName] = useState("");
  return (
    <main className="w-[100vw] bg-yellow-50 h-[85vh] flex justify-center items-center ">
      <form className=" rounded-lg flex justify-center items-center flex-col bg-yellow-300 w-[60vw] p-10 h-auto">
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
          <Link
            href={"book_list"}
            className="p-4 mt-4 rounded-md bg-neutral-900 text-white text-sm"
          >
            Back
          </Link>
          {bookName && contentOwner && publisher && (
            <Link
              //   href={"create_book/upload_img"}
              href={{
                pathname: "create_book/upload_img",
                query: {
                  publisher: publisher,
                  contentOwner: contentOwner,
                  bookName: bookName,
                },
              }}
              className="p-4 mt-4 rounded-md bg-neutral-900 text-white text-sm"
            >
              next
            </Link>
          )}
        </div>
      </form>
    </main>
  );
}
