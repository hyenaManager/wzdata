import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex text-black min-h-screen flex-col items-center justify-center p-24">
      <h2 className=" mb-2">Welcome to wz data</h2>
      <Link href={"book_list"}>See book list</Link>
    </main>
  );
}
