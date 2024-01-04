-- CreateTable
CREATE TABLE "Tbl_book" (
    "idx" SERIAL NOT NULL,
    "book_uniq_idx" TEXT NOT NULL,
    "bookname" TEXT NOT NULL,
    "co_id" INTEGER NOT NULL,
    "publisher_id" INTEGER NOT NULL,
    "cover_photo" TEXT NOT NULL,
    "created_timetick" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tbl_book_pkey" PRIMARY KEY ("book_uniq_idx")
);

-- CreateTable
CREATE TABLE "Content_owner" (
    "idx" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Content_owner_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "idx" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("idx")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tbl_book_idx_key" ON "Tbl_book"("idx");

-- CreateIndex
CREATE UNIQUE INDEX "Tbl_book_book_uniq_idx_key" ON "Tbl_book"("book_uniq_idx");

-- AddForeignKey
ALTER TABLE "Tbl_book" ADD CONSTRAINT "Tbl_book_co_id_fkey" FOREIGN KEY ("co_id") REFERENCES "Content_owner"("idx") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tbl_book" ADD CONSTRAINT "Tbl_book_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "Publisher"("idx") ON DELETE CASCADE ON UPDATE CASCADE;
