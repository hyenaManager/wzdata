"use server";



import { revalidateTag } from "next/cache";
import prisma from "../../prisma/client";

export async function edit_book(newBookData){
    console.log(newBookData," new book data ");
    try {
        await prisma.publisher.update({
            where:{
                idx:parseInt(newBookData.co_id)
            },
            data:{
                name:newBookData.publisher
            }
        })
        await prisma.content_owner.update({
            where:{
                idx:parseInt(newBookData.pu_id)
            },
            data:{
                name:newBookData.contentOwner
            }
        })
        await prisma.tbl_book.update({
            where:{
                idx:newBookData.idx
            },
            data:{
                bookname:newBookData.name,
                cover_photo:newBookData.coverImage
            }
        })
        revalidateTag("allbook")
        console.log("run in edit boollllllllllllllllllk");
    } catch (error) {
        console.log("errrrror");
        return error
    }
}