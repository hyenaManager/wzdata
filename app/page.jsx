import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex text-black h-[85vh] flex-col items-center overflow-auto justify-center p-24">
      <h2 className=" mb-2">Welcome to wz data</h2>
      <Link href={"book_list"}>See book list</Link>
    </main>
  );
}
