import Image from "next/image";
import React from "react";

function TableSearch() {
  return (
    <div className="w-full flex md:w-auto items-center gap-2  text-sm rounded-full ring-[1.5px] ring-gray-300 px-2">
      <Image src="/search.png" alt="" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 outline-none bg-transparent"
      />
    </div>
  );
}

export default TableSearch;
