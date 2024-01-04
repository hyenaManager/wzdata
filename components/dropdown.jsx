import { useState } from "react";

export default function Dropdown({ onChoose }) {
  const data = [
    { name: "some556" },
    { name: "some3" },
    { name: "somee" },
    { name: "somes" },
  ];
  const [name, setname] = useState("");
  const [value, setValue] = useState("");
  const name_filter = () => {
    return data
      .map((author) => {
        if (author.name.toLowerCase().indexOf(name.toLowerCase()) != -1) {
          return author;
        }
      })
      .filter((item) => item !== undefined);
  };
  console.log(name_filter(), "filter");
  return (
    <section className="w-[40vw] relative border">
      <input
        required
        value={name}
        onChange={(e) => {
          setname(e.target.value);
          setValue("");
        }}
        type="text"
        className=" text-lg outline-none border border-cyan-500 rounded-lg w-full  p-3 "
      />
      {name.length > 0 && name_filter().length > 0 && !value && (
        <ul className=" flex justify-center w-full flex-col bg-yellow-200 absolute bottom-[-1] left-0 border-2 border-black rounded-md">
          {name_filter().map((author) => (
            <li
              onClick={() => {
                onChoose(author.name);
                setname(author.name);
                setValue(author.name);
              }}
              className=" w-full p-3 border-b-2 cursor-pointer border-black text-black text-center"
            >
              {author.name}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
