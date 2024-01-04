import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="fixed z-50 top-0 left-0 bg-white w-full h-full flex justify-center items-center">
      <section className=" flex flex-col items-center">
        <Image
          src={"/robot.svg"}
          width={100}
          height={100}
          alt="notFoundError"
        />
        <h2 className="text-4xl text-red-500">Not Found</h2>
        <p className=" text-black">Could not find requested resource </p>
        <p className=" text-black">Navigate back to the following link </p>
        <div className="flex justify-between text-fuchsia-700 text-2xl items-center p-2">
          <Link href="/" className="mr-3">
            Home
          </Link>
          <Link href="/book_list" className="mr-3">
            Book list
          </Link>
        </div>
      </section>
    </main>
  );
}
