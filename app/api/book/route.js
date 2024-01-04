//import { create_book, getAllBooks } from "@/prisma/book"

import { create_book, getAllBooks } from "../../../prisma/book"

export async function POST(request) {
    const data = await request.json()
    try {
        const response = await create_book(data.coverImage,data.contentOwner,data.publisher,data.bookName)
        return new Response(JSON.stringify(response),{
            status:200,
            statusText:"fetched success"
        })
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}

export async function GET(request) {
    try {
        const response = await getAllBooks()
        return new Response(JSON.stringify(response))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}