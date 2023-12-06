"use client";
import Layout from "../../layout";
import { CldImage } from "next-cloudinary";
import ShopPage from "./shopPage";
import { Instagram } from "lucide-react";
import Link from "next/link";
export const dynamicParams = true;

async function getStore(id: string) {
  const store = await fetch(`http://localhost:3000/api/store/${id}`, {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());

  return store;
}

export default async function Page({ params }) {
  const store = await getStore(params.id);
  console.log(store);
  return (
    // <Layout>
    //   <ShopPage shopData={store} />
    // </Layout>
    <Layout>
      <div>
        <section>
          <div className="p-20">
            <div className="pr-2">
              <div className="relative mx-auto rounded-full overflow-hidden shadow-lg">
                <CldImage
                  src={store.avatar.publicId}
                  width="400"
                  height="400"
                  sizes="100vw"
                  alt="image of store"
                />
              </div>
            </div>
            <h1 className=" flex font-bold font-sans text-7xl">{store.name}</h1>
            <div>
              {/* <Link href> */}
              <div className="flex font-semibold p-3 font-sans text-xl">
                <div className="pr-2">
                  <Instagram />
                </div>
                {store.instagramHandle}
              </div>
              {/* </Link> */}
            </div>
          </div>
        </section>

        <section>
          <div className="p-3">Rating: {store.averageRating}</div>
          <div className="p-3">Phone Number: {store.phoneNumber}</div>
          <div className="p-3">
            {" "}
            Seating Type:
            {store.serviceTypes.sitIn.map((type) => (
              <div>{type}</div>
            ))}
          </div>
          <div>{store.serviceTypes.takeOut}</div>
          <div>{store.serviceTypes.delivery}</div>
          <div>{store.serviceTypes.curbsidePickup}</div>
        </section>

        <div>
          {store.images.map((image) => (
            <CldImage
              key={image.id}
              src={image.publicId}
              width="600"
              height="600"
              sizes="100vw"
              alt="image of store"
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
