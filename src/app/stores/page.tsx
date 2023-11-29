"use client";

import { useEffect, useState } from 'react';

const ShopPage = () => {
  const [shopId, setShopId] = useState<string | null>(null);
  const [shopData, setShopData] = useState<any>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/shop/${shopId}`);
        const data = await response.json();
        setShopData(data.result);
      } catch (error) {
        console.error('Error fetching shop data:', error);
      }
    };

    if (shopId) {
      fetchData();
    }
  }, [shopId]);

  if (!shopData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{shopData.name || 'Loading...'}</h1>
      <p>Rating: {shopData.averageRating || 'Loading...'}</p>
      <p>Phone Number: {shopData.phoneNumber || 'Not available'}</p>
      <p>Service Types: {shopData.serviceTypes?.join(', ') || 'Not available'}</p>
      <p>Service Hours: {shopData.serviceHours || 'Not available'}</p>

      <img src={shopData.avatar?.url} alt="Shop Avatar" /> {/* Adjust based on your actual data structure */}

      <h2>Image Gallery</h2>
      <div className="gallery">
        {shopData.images?.map((image, index) => (
          <img
            key={index}
            src={`https://res.cloudinary.com/${process.env.CLOUD_NAME}/v${image.version}/${image.publicId}.${image.format}`}
            alt={`Shop Image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
