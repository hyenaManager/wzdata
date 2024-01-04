import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/button";
import LoadingIndicator from "../components/pageLoading";

export default function Home() {
  return (
    <main className="flex text-black h-[85vh] flex-col items-center overflow-auto justify-center p-24">
      <h2 className=" text-[30px] cursor-pointer font-bold text-yellow-700 p-5 mb-2">
        Welcome to WZ
      </h2>
      <Link href={"book_list"}>
        <Button
          buttonName={"see book list"}
          className=" bg-yellow-300 p-4 text-xl"
        />
      </Link>
    </main>
  );
}
