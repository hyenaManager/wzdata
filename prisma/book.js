import prisma from "./client";


export async function getAllBooks(){
    try {
        const books = await prisma.tbl_book.findMany({
           include:{
            contentOwner:true,
            publisher:true,
           } 
        })
        return books
    } catch (error) {
        return error
    }
}

export async function create_book(cover_photo,contentOwnerName,publisherName,name){
    const content_owner = await prisma.content_owner.create({
        data:{
            name:contentOwnerName
        }
    })
    const publisher = await prisma.publisher.create({
        data:{
            name:publisherName
        }
    })
    try {
        const data = await prisma.tbl_book.create({
          data: {
            bookname: name,
            co_id:content_owner.idx,
            publisher_id: publisher.idx,
            cover_photo: cover_photo,
          },
        });
        return data
      } catch (error) {
        return error
      }
}

export async function delete_book(book_id,co_id,pu_id){
    try {
        await prisma.tbl_book.delete({
            where:{
                idx:book_id
            }
        })
        await prisma.publisher.delete({
            where:{
                idx:parseInt(pu_id)
            }
        })
        await prisma.content_owner.delete({
            where:{
                idx:parseInt(co_id)
            }
        })
    } catch (error) {
        return error
    }
}

export async function editBook(book_id,new_name,new_cover_photo,content_owner_id,publisher_id){
    try {
        await prisma.tbl_book.update({
            where:{
                idx:book_id
            },
            data:{
                bookname:new_name,
                cover_photo:new_cover_photo,
                co_id:content_owner_id,
                publisher_id:publisher_id
            }
        })
        return "success"
    } catch (error) {
        return error
    }
}

export async function allPublisher(){
    try {
        return await prisma.publisher.findMany()

    } catch (error) {
        return error
    }
}

export async function allContentOwer(){
    try {
        return await prisma.content_owner.findMany()
    } catch (error) {
        return error
    }
}