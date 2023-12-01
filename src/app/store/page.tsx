// "use client";
// import { useState } from "react";
// import Link from "next/link";

// export default function ShopPage() {
//   const [shopId, setShopId] = useState<string | null>(null);
//   // const [data, setdata] = useState<any>(null);
//   const data = {
//     name: "Blue Bottle Coffee",
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
//       <h1>{data.name || "Loading..."}</h1>
//       <p className="rating">Rating: {data.averageRating || "Loading..."}</p>
//       <p>Phone Number: {data.phoneNumber || "Not available"}</p>
//       <p>Service Types: {data.serviceTypes?.join(", ") || "Not available"}</p>
//       <p>Service Hours: {data.serviceHours || "Not available"}</p>

//       <img className="avatar" src={data.avatar?.url} alt="Shop Avatar" />

//       <h2>Image Gallery</h2>
//       <div className="gallery">
//         {data.images?.map((image, index) => (
//           <img key={index} src={image.url} alt={`Shop Image ${index + 1}`} />
//         ))}
//       </div>

//       {/* Add other shop information here */}

//       {/* Link to the shop details page */}
//       {/* <Link href={`/stores/${shopId}`}>
//         <a className="details-link">View Details</a>
//       </Link> */}

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

////////////////////////////////////////////////////////////////

// import { PrismaStoreType } from "@/app/types";

// export default function Page({
//   params,
// }: {
//   params: { store: PrismaStoreType };
// }) {
//   return (
//     <div>
//       <h1>hello</h1>
//     </div>
//   );
// }
