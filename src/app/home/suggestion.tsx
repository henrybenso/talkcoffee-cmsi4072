"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";

const Suggestion = ({
  store,
}: {
  store: {
    id: string;
    name: string;
    averageRating: number;
    avatar: { publicId: string; format: string; version: string };
  };
}) => {
  return (
    <div className="">
      {/* <h1>Your Search Results: for {stores.query}</h1> */}
      <Link href={`stores/${store.id}`}>
        <div className="flex items-center text-sm pl-5 p-3 w-full rounded-md border border-yellow-800 py-[9px] outline-2">
          <div className="pr-2">
            <div className="relative mx-auto rounded-full overflow-hidden">
              <CldImage
                src={store.avatar.publicId}
                width="50"
                height="50"
                sizes="100vw"
                alt="store avatar image"
              />
            </div>
          </div>
          {store.name}
        </div>
      </Link>
    </div>
  );
};

export default Suggestion;
