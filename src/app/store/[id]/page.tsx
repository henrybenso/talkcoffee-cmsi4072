import dynamic from "next/dynamic";
import Layout from "../../layout";
import { Suspense } from "react";
import { Instagram } from "lucide-react";
export const dynamicParams = true;

enum Days {
  SUN = "Sunday",
  MON = "Monday",
  TUE = "Tuesday",
  WED = "Wednesday",
  TR = "Thursday",
  FRI = "Friday",
  SAT = "Saturday",
}

async function getStore(id: string) {
  const store = await fetch(`http://localhost:3000/api/store/${id}`, {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());

  return store;
}

const AvatarImage = dynamic(() => import("./avatarImage"), {
  ssr: false,
});

const ImageGallery = dynamic(() => import("./imageGallery"), {
  ssr: false,
});

export default async function Page({ params }) {
  const store = await getStore(params.id);
  const instagramUrl = `https://www.instagram.com/${store.instagramHandle}`;

  // const serviceHoursLocal = store.serviceHours.map((serviceDay) => {
  //   serviceDay.open =
  // })

  console.log(store);
  return (
    <Layout>
      <>
        <div>
          <div className="pr-6">
            <div className="mx-auto overflow-hidden">
              <div className="flex flex-row p-6">
                <Suspense fallback={<p>Loading avatar image...</p>}>
                  <AvatarImage
                    params={{
                      avatarId: store.avatar.publicId,
                    }}
                  />
                </Suspense>
                <div className="grid grid-cols-1 font-bold font-sans text-7xl content-center">
                  {store.name}
                  <div className="flex flex-row font-semibold p-1 font-sans text-xl">
                    <div className="pr-1">
                      <Instagram />
                    </div>
                    <div>
                      <a href={instagramUrl} target="_blank">
                        {store.instagramHandle}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="font-semibold">
          <div className="p-3">
            <div>Rating: {store.averageRating}</div>
            <div>Phone Number: {store.phoneNumber}</div>
          </div>
          <br />
          <div className="p-3">
            Seating Type:
            {store.serviceTypes.sitIn.map((type, index) => (
              <div key={index} className="pl-5">
                {type}
              </div>
            ))}
          </div>
          <br />
          <div className="p-3">
            <div>Take out Options:</div>
            <div className="pl-5">
              <div>{store.serviceTypes.takeOut && <div>Order Pickup</div>}</div>
              <div>{store.serviceTypes.delivery && <div>Delivery</div>}</div>
              <div>
                {store.serviceTypes.curbsidePickup && (
                  <div>Curbside Pickup</div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="p-3">
            <ol className="font-semibold">
              Hours:
              {store.serviceHours.map((serviceHour, index) => (
                <li key={index} className="pl-5">
                  <div>
                    <div className="pr-2">{Days[serviceHour.day]}:</div>
                    <div className="pl-5">
                      <div>Open: {serviceHour.open}</div>
                      <div>Close: {serviceHour.close}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div>
          <div className="p-3 flex font-bold font-sans text-5xl">Gallery</div>
          <div className="">
            <Suspense fallback={<p>Loading image gallery...</p>}>
              <ImageGallery params={store.images} />
            </Suspense>
          </div>
        </div>
      </>
    </Layout>
  );
}
