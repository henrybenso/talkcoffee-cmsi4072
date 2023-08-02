import Image from "next/image";

export default function ImageScroller() {
  return (
    <>
      <div className="overflow-x-auto flex h-1/6 w-full">
        <div className="flex-none">
          <Image
            className=""
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div>
        <div className="flex-none">
          <Image
            className=""
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div>
        <div className="flex-none">
          <Image
            className=""
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div>
        <div className="flex-none">
          <Image
            className=""
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div>
        <div className="flex-none">
          <Image
            className=""
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div>
        <div className="flex-none">
          <Image
            className=""
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div>
        <div className="flex-none">
          <Image
            className=""
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div>
      </div>
    </>
  );
}
