import Link from "next/link";
import DeleteBook from "./deleteBook";
import MyButton from "./button";
import LoadingIndicator from "./pageLoading";
import { getAllBooks } from "../prisma/book";

const getAllBooks = async () => {
  const response = await fetch("https://wzdata-three.vercel.app/api/book", {
    next: { tags: ["allbook"] },
    cache: "default",
  });
  if (response.ok) {
    return response.json();
  } else {
    return new Error(response.statusText);
  }
};

export default async function BookListTable() {
  const books = await getAllBooks();
  return (
    <main className=" flex w-[100vw] justify-start flex-col items-center bg-yellow-50 h-[85vh]">
      <section className="flex justify-evenly flex-row m-4 w-full">
        <Link
          href={"create_book"}
          className=" bg-green-400 rounded-md p-2  px-4 text-xl text-white"
        >
          <LoadingIndicator>
            <lable>create book</lable>
          </LoadingIndicator>
        </Link>
      </section>
      <h1 className=" text-2xl font-bold w-[80%] text-start">Book list</h1>
      <table className=" w-[90%] border-2 border-yellow-600  rounded-t-lg">
        <thead className=" text-xl rounded-t-lg">
          <tr className=" rounded-lg bg-yellow-600">
            <th className=" text-center py-4">Idx</th>
            <th className=" text-center py-4">Book Name</th>
            <th className=" text-center py-4">Content Owner</th>
            <th className=" text-center py-4">Publisher</th>
            <th className=" text-center py-4">Created Date</th>
            <th className=" text-center py-4"></th>
            <th className=" text-center py-4"></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book.idx}
              className="w-full border border-green-400 p-3 text-xl"
            >
              <td className=" bg-yellow-200 text-center py-4">{index}</td>
              <td className=" bg-yellow-200 text-center py-4">
                {book.bookname}
              </td>
              <td className=" bg-yellow-200 text-center py-4">
                {book.contentOwner.name}
              </td>
              <td className=" bg-yellow-200 text-center py-4">
                {book.publisher.name}
                {book.cr}
              </td>
              <td className=" bg-yellow-200 text-center py-4">
                {book.created_timetick.toLocaleString().split("T")[0]}
              </td>
              <td className=" bg-yellow-200 text-center py-4 cursor-pointer">
                <DeleteBook
                  bookId={book.idx}
                  co_id={book.co_id}
                  pu_id={book.publisher_id}
                />
              </td>
              <td className=" bg-yellow-200 text-center py-4 cursor-pointer">
                <LoadingIndicator>
                  <Link href={`book_list/${book.idx}`}>
                    <MyButton
                      buttonName={"edit"}
                      className=" hover:bg-green-500"
                    />
                  </Link>
                </LoadingIndicator>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
