"use client";

import { handleDeleteBook } from "../app/serverAction/deleteAction";
//import { handleDeleteBook } from "@/app/serverAction/deleteAction";
import MyButton, { Button } from "./button";
import MyModal from "./modal";
import { useState } from "react";

export default function DeleteBook({ bookId }) {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("it reached here");
        handleDeleteBook(bookId);
        setShowModal(false);
      }}
    >
      <MyButton
        buttonName={"delete"}
        onclick={() => setShowModal(true)}
        className=" hover:bg-red-500"
      />
      {showModal && (
        <MyModal>
          <section className="w-[50vw] h-[50vh] rounded-md relative bg-white flex flex-col p-9 justify-evenly">
            {isError && (
              <i className=" italic text-red-500 text-lg">
                Something went wrong{" "}
              </i>
            )}
            {deleting ? (
              <label>Deleting....</label>
            ) : (
              <>
                <label>Are you sure to delete</label>
                <Button buttonName={"confirm"} />
                <MyButton
                  buttonName={"back"}
                  onclick={() => setShowModal(false)}
                  className=" absolute top-2 left-2 cursor-pointer"
                />
              </>
            )}
          </section>
        </MyModal>
      )}
    </form>
  );
}
