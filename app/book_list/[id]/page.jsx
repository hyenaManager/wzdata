// import EditBook from "@/components/editBook";
// import prisma from "@/prisma/client";

import Link from "next/link";
import EditBook from "../../../components/editBook";
import prisma from "../../../prisma/client";

export default async function Page({ params }) {
  if (isNaN(params.id))
    return (
      <div className="flex justify-center h-[85vh] w-[100vw] items-center">
        <Link href={"/book_list"} className=" text-xl text-black ">
          There is no book with that id, back to book list
        </Link>
      </div>
    );
  const book = await prisma.tbl_book.findFirst({
    where: {
      idx: parseInt(params.id),
    },
    include: {
      contentOwner: true,
      publisher: true,
    },
  });
  return <EditBook book={book} />;
}
