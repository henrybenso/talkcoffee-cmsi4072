"use client";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
export const dynamicParams = true;

const ShopPage = (shopData) => {
  //   const [shopId, setShopId] = useState<string | null>(null);
  //   const [shopData, setShopData] = useState<any>(null);

  //   useEffect(() => {
  //     setShopId("sample-shop-id");
  //     const fetchData = async () => {
  //       try {
  //         const data = {
  //           name: "Blue Bottle Coffee",
  //           averageRating: 4.5,
  //           phoneNumber: "(510) 653-3394",
  //           serviceTypes: ["Dine-in", "Takeout", "Delivery"],
  //           serviceHours: {
  //             Wednesday: "7 AM–5 PM",
  //             Thursday: "7 AM–5 PM",
  //             Friday: "7 AM–6 PM",
  //             Saturday: "7 AM–6 PM",
  //             Sunday: "7 AM–5 PM",
  //             Monday: "7 AM–5 PM",
  //             Tuesday: "7 AM–5 PM",
  //           },
  //           address: "300 S Broadway, Los Angeles, CA 90013",
  //           location: "Bradbury Building",
  //           avatar: {
  //             url: "https://static1.squarespace.com/static/5be4ea9b55b02cf09b6748bd/5be9fe800ebbe885c5b76f3b/5e6e876d73af576a4f972d01/1587076876813/Bottle%252BLogo-Small.001_031820.jpg?format=1500w",
  //           },
  //           images: [
  //             {
  //               publicId: "1",
  //               version: "1",
  //               format: "jpg",
  //               url: "https://lh3.googleusercontent.com/p/AF1QipPoULIMZkHagDpD4kpnt3A40t8ZHP66GTzqE9K6=s1360-w1360-h1020",
  //             },
  //           ],
  //         };
  //         setShopData(data);
  //       } catch (error) {
  //         console.error("Error fetching shop data:", error);
  //       }
  //     };

  //     if (shopId) {
  //       fetchData();
  //     }
  //   }, [shopId]);

  //   if (!shopData) {
  //     return <div className="loading">Loading...</div>;
  //   }

  return (
    <div className="shop-container">
      <div>
        <CldImage
          className="shadow-lg"
          src={shopData.avatar.publicId}
          width="400"
          height="400"
          sizes="100vw"
          alt="image of store"
        />
      </div>
      <h1>{shopData.name || "Loading..."}</h1>
      <p className="rating">Rating: {shopData.averageRating || "Loading..."}</p>
      <p>Phone: {shopData.phoneNumber || "Not available"}</p>
      <p>
        Service Options: {shopData.serviceTypes?.join(" · ") || "Not available"}
      </p>
      <p>Located in: {shopData.location}</p>
      <p>Address: {shopData.address}</p>
      <p>Hours:</p>
      {/* <ul>
        {Object.entries(shopData.serviceHours).map(([day, hours]) => (
          <li key={day}>
            {day}: {hours}
          </li>
        ))}
      </ul> */}

      {/* <div className="gallery">
        {shopData.images?.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Shop Image ${index + 1}`}
            className="gallery-image"
          />
        ))}
      </div>

      <a href={`/stores/${shopId}`} className="details-link">
        View Details
      </a> */}

      <style jsx>{`
        .shop-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .avatar {
          width: 100%;
          max-width: 200px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin: 0 auto 20px;
        }

        h1 {
          font-size: 2em;
          margin-bottom: 10px;
        }

        .rating {
          font-weight: bold;
          font-size: 1.2em;
        }

        p {
          margin-bottom: 8px;
          font-size: 1.1em;
        }

        ul {
          padding-left: 20px;
        }

        .gallery {
          display: flex;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .gallery-image {
          width: 100%;
          max-width: 350px;
          margin: 0 10px 10px 0;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .details-link {
          display: inline-block;
          margin-top: 20px;
          padding: 10px;
          background-color: #0070f3;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }

        .details-link:hover {
          background-color: #0056b3;
        }

        // Add more styles as needed
      `}</style>
    </div>
  );
};

export default ShopPage;
