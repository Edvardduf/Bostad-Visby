import React, { useEffect, useState } from 'react'
import { Link, Outlet } from "react-router-dom";

function ListingCards() {
    const [initResponse, setInitResponse] = useState([]);

  useEffect(() => {
    async function getListings() {
      try {
        const response = await fetch("http://localhost:8000/listings");
        const data = await response.json();
        setInitResponse(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getListings();
  }, []);
  return (
    <div className="flex flex-wrap justify-center gap-3">
    {initResponse.map((data, index) => (
      <div
        className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        key={index}
      >
        {/* Listing Image (Replace 'image-placeholder.jpg' with actual image URL) */}
        <img
          className="w-full h-48 object-cover object-center"
          src={data.img.map((data1) => data1.url)}
          alt="Listing Image"
        />

        <div className="px-4 py-2">
          {/* Listing Title */}
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {data.title}
          </h3>

          {/* Listing Details */}
          <div className="mt-4">
            {/* Property Type */}
            <p className="text-gray-700">
              Läge:{" "}
              <span className="font-semibold">
                {data.neighborhood.area}
              </span>
            </p>
            {/* Beds */}
            <p className="text-gray-700">
              Bäddar: <span className="font-semibold">{data.beds}</span>
            </p>
            {/* Lot Size */}
            <p className="text-gray-700">
              Boyta:{" "}
              <span className="font-semibold">{data.sq_feet} m²</span>
            </p>
          </div>
        </div>

        {/* Listing Footer */}
        <div className="px-4 pt-3 pb-2 border-t border-gray-200">
          {/* Price */}
          <p className="text-lg text-gray-800 font-semibold">
            Pris: {data.weeks.map((data1) => data1.price)} kr
          </p>
          {/* Location */}
          <p className="mt-2 text-sm text-gray-600">
            Adress: {data.address}
          </p>
          {/* More details button */}
          <Link
            to={"/accommodations/" + data.id}
            className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Mer info
          </Link>
        </div>
      </div>
    ))}
  </div>
  )
}

export default ListingCards