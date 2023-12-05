"use client";
import Layout from "../../layout";
import { CldImage } from "next-cloudinary";
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
    <Layout>
      <div>
        <h1>{store.name}</h1>
        <h2>{store.avatar.publicId}</h2>
        <CldImage
          src={store.avatar.publicId}
          width="400"
          height="400"
          sizes="100vw"
          alt="image of store"
        />
        <div>
          {store.images.map((image) => (
            <CldImage
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
