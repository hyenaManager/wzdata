// import EditBook from "@/components/editBook";
// import prisma from "@/prisma/client";

import EditBook from "../../../components/editBook";
import prisma from "../../../prisma/client";

export default async function Page({ params }) {
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
