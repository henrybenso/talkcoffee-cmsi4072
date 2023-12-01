"use client";

import { CldImage } from "next-cloudinary";
import Link from "next/link";

const Result = ({
  store,
}: {
  store: {
    id: string;
    name: string;
    averageRating: number;
    avatar: { publicId: string; format: string; version: string };
  };
}) => {
  // const url = getCldImageUrl({
  //   width: 960,
  //   height: 600,
  //   src: store.avatar.publicId,
  // });
  return (
    <div>
      <Link href={`/store/${store.id}`}>
        <div className="flex items-center text-sm pl-5 p-3 border border-x-amber-700 hover:border-amber-800">
          {/* <h1>Your Search Results: for {stores.query}</h1> */}
          <div className="pr-2">
            <CldImage
              src={store.avatar.publicId}
              width="100"
              height="100"
              sizes="100vw"
              alt="store avatar image"
            />
          </div>
          {/* <Image loader={url} width={500} height={500} alt="store avatar image" /> */}
          <div>
            <h1 className="text-2xl font-bold content-center">{store.name}</h1>
            <h2 className="text-1xl font-bold">
              Rating: {store.averageRating}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Result;
