import Image from "next/image";

export default function ImageScroller() {
  return (
    <>
      <div className="">
        <div className="snap-x flex flex-nowrap">
          <div className="w-full h-full">
            <Image
              className="object-none"
              src="/coffee_photo.jpg"
              width={400}
              height={400}
              alt="Picture of coffee"
            />
          </div>
          <div className="w-full h-full">
            <Image
              className="object-none"
              src="/coffee_photo.jpg"
              width={400}
              height={400}
              alt="Picture of coffee"
            />
          </div>
          <div className="w-full h-full">
            <Image
              className="object-none"
              src="/coffee_photo.jpg"
              width={400}
              height={400}
              alt="Picture of coffee"
            />
          </div>
          <div className="w-full h-full">
            <Image
              className="object-none"
              src="/coffee_photo.jpg"
              width={400}
              height={400}
              alt="Picture of coffee"
            />
          </div>
          {/* <div className="min-w-full">
            <Image
              src="/coffee_photo.jpg"
              width={400}
              height={400}
              alt="Picture of coffee"
            />
          </div>
          <div className="min-w-full">
            <Image
              src="/coffee_photo.jpg"
              width={400}
              height={400}
              alt="Picture of coffee"
            />
          </div>
          <div className="min-w-full">
            <Image
              src="/coffee_photo.jpg"
              width={400}
              height={400}
              alt="Picture of coffee"
            />
          </div>
          <div className="min-w-full">
            <Image
              src="/coffee_photo.jpg"
              width={400}
              height={400}
              alt="Picture of coffee"
            />
          </div> */}
          {/* <div className="scroll whitespace-nowrap scroll-smooth">
          <Image
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div>
        <div className="scroll whitespace-nowrap scroll-smooth">
          <Image
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div>
        <div className="scroll whitespace-nowrap scroll-smooth">
          <Image
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div>
        <div className="scroll whitespace-nowrap scroll-smooth">
          <Image
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div> */}
        </div>
        {/* <div className="scroll-ml-6 snap-center">
          <Image
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div>
        <div className="scroll-ml-6 snap-center">
          <Image
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div>
        <div className="scroll-ml-6 snap-center">
          <Image
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div>
        <div className="scroll-ml-6 snap-center">
          <Image
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div>
        <div className="scroll-ml-6 snap-center">
          <Image
            src="/coffee_photo.jpg"
            width={400}
            height={400}
            alt="Picture of coffee"
          />
        </div> */}
      </div>
    </>
  );
}
