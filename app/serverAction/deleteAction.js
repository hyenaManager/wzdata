"use server";

// import { delete_book } from "@/prisma/book";
import { revalidatePath, revalidateTag } from "next/cache";
import { delete_book } from "../../prisma/book";

export const handleDeleteBook = async (bookId,co_id,pu_id) => {
  "use server";
  try {
    await delete_book(bookId,co_id,pu_id);
    revalidateTag("allbook")
  } catch (error) {
    console.log(error);
    return error;
  }
};
