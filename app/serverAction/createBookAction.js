"use server";

import {  revalidateTag } from "next/cache";

export const revalidateBookList = async () => {
  "use server";
    try {
        revalidateTag("allbook")
    } catch (error) {
        console.log(error);
    }

};
