"use client";
import clsx from "clsx";

export default function MyButton({
  className = "",
  buttonName,
  children = null,
  onclick,
}) {
  return (
    <>
      <div
        onClick={onclick}
        className={clsx(
          "p-3 px-4 w-fit bg-black text-white rounded-md text-lg ",
          {
            [className]: className != "",
          }
        )}
      >
        {buttonName}
      </div>
      {children}
    </>
  );
}

export function Button({ className = "", buttonName }) {
  return (
    <>
      <button
        type="submit"
        className={clsx("p-2 px-5 bg-black text-white rounded-md text-lg ", {
          [className]: className != "",
        })}
      >
        {buttonName}
      </button>
    </>
  );
}
