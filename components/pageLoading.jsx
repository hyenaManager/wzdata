"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingIndicator({ children }) {
  const [showLoading, setShowLoading] = useState(false);

  return (
    <>
      {showLoading && (
        <div className=" absolute top-1 right-1 flex justify-center animate-pulse items-center flex-row">
          <Image src={"/book.svg"} alt="book" width={70} height={70} />
          <h4 className=" text-2xl text-white font-bold">Loading</h4>
        </div>
      )}
      <button onClick={() => setShowLoading(true)}>{children}</button>
    </>
  );
}
