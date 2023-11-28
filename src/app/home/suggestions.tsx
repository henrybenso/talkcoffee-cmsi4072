import fetchFilteredStores from "@/lib/data";
import { useState } from "react";

export default async function Suggestions(stores) {
  return (
    <div>
      <div className="peer block w-full border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500">
        <ul className="">
          {stores.map((store, index) => (
            <li className="p-3" key={index}>
              {store.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
