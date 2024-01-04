import Link from "next/link";

export default function NavBar() {
  return (
    <ul className=" flex sticky justify-start flex-row bg-yellow-300 items-center h-[15vh]">
      <Link
        href={"/"}
        className=" text-[30px] cursor-pointer font-bold text-yellow-700 p-5"
      >
        WZ
      </Link>
      <Link href={"book_list"} className="text-xl p-2 cursor-pointer">
        Home
      </Link>
    </ul>
  );
}
