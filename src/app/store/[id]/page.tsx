"use client";

import { PrismaStoreType } from "@/app/types";
import { usePathname } from "next/navigation";

export default function Page({
  params,
}: {
  params: { store: PrismaStoreType };
}) {
  async function generateStaticParams() {
    const path = usePathname();
    const res = await fetch(`http://localhost:3000/api${path}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const store = await res.json();
    console.log(store);
    console.log(path);
  }
  const test = generateStaticParams();

  // console.log(test);
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

// // "use client";

// // import { useEffect, useState } from 'react';

// // const ShopPage = () => {
// //   const [shopId, setShopId] = useState<string | null>(null);
// //   const [shopData, setShopData] = useState<any>(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await fetch(`/api/shop/${shopId}`);
// //         const data = await response.json();
// //         setShopData(data.result);
// //       } catch (error) {
// //         console.error('Error fetching shop data:', error);
// //       }
// //     };

// //     if (shopId) {
// //       fetchData();
// //     }
// //   }, [shopId]);

// //   if (!shopData) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div>
// //       <h1>{shopData.name || 'Loading...'}</h1>
// //       <p>Rating: {shopData.averageRating || 'Loading...'}</p>
// //       <p>Phone Number: {shopData.phoneNumber || 'Not available'}</p>
// //       <p>Service Types: {shopData.serviceTypes?.join(', ') || 'Not available'}</p>
// //       <p>Service Hours: {shopData.serviceHours || 'Not available'}</p>

// //       <img src={shopData.avatar?.url} alt="Shop Avatar" /> {/* Adjust based on your actual data structure */}

// //       <h2>Image Gallery</h2>
// //       <div className="gallery">
// //         {shopData.images?.map((image, index) => (
// //           <img
// //             key={index}
// //             src={`https://res.cloudinary.com/${process.env.CLOUD_NAME}/v${image.version}/${image.publicId}.${image.format}`}
// //             alt={`Shop Image ${index + 1}`}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ShopPage;

//////////////////////////////////////////////////////////////////////////////////////////////
// ("use client");
// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function ShopPage() {
//   const [shopId, setShopId] = useState<string | null>(null);
//   const [shopData, setShopData] = useState<any>(null);
//   const data = {
//     name: "Sample Shop",
//     averageRating: 4.5,
//     phoneNumber: "123-456-7890",
//     serviceTypes: ["Cafe", "Bar"],
//     serviceHours: "Mon-Fri 9:00 AM - 6:00 PM",
//     avatar: { url: "https://placekitten.com/200/200" },
//     images: [
//       {
//         publicId: "1",
//         version: "1",
//         format: "jpg",
//         url: "https://placekitten.com/300/300",
//       },
//       {
//         publicId: "2",
//         version: "1",
//         format: "jpg",
//         url: "https://placekitten.com/300/301",
//       },
//       // Add more images as needed
//     ],
//   };
//   return (
//     <div className="shop-container">
//       <h1>{shopData.name || "Loading..."}</h1>
//       <p className="rating">Rating: {shopData.averageRating || "Loading..."}</p>
//       <p>Phone Number: {shopData.phoneNumber || "Not available"}</p>
//       <p>
//         Service Types: {shopData.serviceTypes?.join(", ") || "Not available"}
//       </p>
//       <p>Service Hours: {shopData.serviceHours || "Not available"}</p>

//       <img className="avatar" src={shopData.avatar?.url} alt="Shop Avatar" />

//       <h2>Image Gallery</h2>
//       <div className="gallery">
//         {shopData.images?.map((image, index) => (
//           <img key={index} src={image.url} alt={`Shop Image ${index + 1}`} />
//         ))}
//       </div>

//       {/* Add other shop information here */}

//       {/* Link to the shop details page */}
//       <Link href={`/stores/${shopId}`}>
//         <a className="details-link">View Details</a>
//       </Link>

//       <style jsx>{`
//         .shop-container {
//           max-width: 600px;
//           margin: 0 auto;
//           padding: 20px;
//         }
//         .loading {
//           text-align: center;
//         }
//         .rating {
//           font-weight: bold;
//         }
//         .avatar {
//           width: 100%;
//           max-width: 300px;
//           margin-top: 20px;
//         }
//         .gallery {
//           display: flex;
//           flex-wrap: wrap;
//           margin-top: 20px;
//         }
//         .gallery img {
//           width: 100%;
//           max-width: 200px;
//           margin: 0 10px 10px 0;
//         }
//         .details-link {
//           display: inline-block;
//           margin-top: 20px;
//           padding: 10px;
//           background-color: #0070f3;
//           color: white;
//           text-decoration: none;
//           border-radius: 5px;
//         }
//         .details-link:hover {
//           background-color: #0056b3;
//         }
//       `}</style>
//     </div>
//   );
// }
