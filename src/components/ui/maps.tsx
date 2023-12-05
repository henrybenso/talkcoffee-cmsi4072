// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl, { LngLatLike } from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiaGJlbnNvIiwiYSI6ImNsbDV2dTl0NjBjYzMzcnM4NTdrMDZyMTgifQ.VcDVcpA5edcvU_Ao7auekQ";

// interface MapProps {
//   liveLocation: LngLatLike;
//   stores: { name: string; coordinates: LngLatLike }[];
// }

// export default function Maps({ liveLocation }) {
//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoiZWRkeTI4MDUiLCJhIjoiY2xuZjZ6MW5oMGp4YjJpdXBydGN4ZGRxayJ9.LIn7u8rJrHlpboKiZQuEhw";

//     const map = new mapboxgl.Map({
//       container: "map-container",
//       style: "mapbox://styles/mapbox/streets-v12",
//       center: liveLocation,
//       zoom: 12,
//     });

//     map.addControl(
//       new mapboxgl.GeolocateControl({
//         positionOptions: {
//           enableHighAccuracy: true,
//         },
//         // When active the map will receive updates to the device's location as it changes.
//         trackUserLocation: true,
//         // Draw an arrow next to the location dot to indicate which direction the device is heading.
//         showUserHeading: true,
//       })
//     );

//     // if (stores) {
//     //   stores.forEach((store) => {
//     //     new mapboxgl.Marker()
//     //       .setLngLat(store.coordinates)
//     //       .setPopup(new mapboxgl.Popup().setHTML(`<h3>${store.name}</h3>`))
//     //       .addTo(map);
//     //   });
//     // }

//     return () => {
//       map.remove();
//     };
//   }, [liveLocation]);

//   return <div id="map-container" style={{ height: "400px" }} />;
// }

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGJlbnNvIiwiYSI6ImNsbDV2dTl0NjBjYzMzcnM4NTdrMDZyMTgifQ.VcDVcpA5edcvU_Ao7auekQ";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    }).addControl(new mapboxgl.AttributionControl(), "top-left");
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
