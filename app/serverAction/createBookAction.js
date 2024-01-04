"use server";


import {  revalidateTag } from "next/cache";

export const revalidateBookList = async () => {
    try {
        revalidateTag("allbook")
    } catch (error) {
        console.log(error);
    }

};
