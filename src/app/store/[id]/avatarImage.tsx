"use client";
import { Instagram } from "lucide-react";
import { CldImage } from "next-cloudinary";
export default function AvatarImage({
  params,
}: {
  params: { avatarId: string };
}) {
  return (
    <>
      <div className="">
        <div className="flex mx-auto overflow-hidden">
          <div className="p-6">
            <CldImage
              className="rounded-full"
              src={params.avatarId}
              width="200"
              height="200"
              sizes="100vw"
              alt="image of store"
            />
          </div>
        </div>
      </div>
    </>
  );
}
