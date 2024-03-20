import React, { useEffect, useState } from "react";

function Accomodation() {
  const [initResponse, setInitResponse] = useState([]);

  useEffect(() => {
    async function getListings() {
      try {
        const response = await fetch("http://localhost:8000/listings");
        const data = await response.json();
        console.log(data);
        setInitResponse(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getListings();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl pb-3">Alla annonser</h1>
      <div className="flex flex-wrap justify-center gap-3">
      {initResponse.map((data, index) => (
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden" key={index}>
            {/* Listing Image (Replace 'image-placeholder.jpg' with actual image URL) */}
            <img
              className="w-full h-48 object-cover object-center"
              src={data.img.map((data1) => (data1.url))}
              alt="Listing Image"
              key={data.index}
              />

            <div className="px-4 py-2" key={index}>
              {/* Listing Title */}
              <h3 className="text-lg font-semibold text-gray-800 truncate" key={index}>
                {data.title}
              </h3>

              {/* Listing Description */}
              <p className="text-gray-600 mt-2" key={index}>{data.description}</p>

              {/* Listing Details */}
              <div className="mt-4" key={index}>
                {/* Property Type */}
                <p className="text-gray-700" key={index}>
                  Läge:{" "}
                  <span className="font-semibold" key={index}>{data.neighborhood.area}</span>
                </p>
                {/* Beds */}
                <p className="text-gray-700" key={index}>
                  Bäddar: <span className="font-semibold">{data.beds}</span>
                </p>
                {/* Lot Size */}
                <p className="text-gray-700" key={index}>
                  Boyta:{" "}
                  <span className="font-semibold" key={index}>{data.sq_feet} m²</span>
                </p>
              </div>
            </div>

            {/* Listing Footer */}
            <div className="px-4 pt-3 pb-2 border-t border-gray-200" key={index}>
              {/* Price */}
              <p className="text-lg text-gray-800 font-semibold" key={index}>Pris: {data.weeks.map((data1) => (data1.price))} kr</p>
              {/* Location */}
              <p className="mt-2 text-sm text-gray-600" key={index}>
                Adress: {data.address}
              </p>
              {/* More details button */}
              <a
                href="#"
                className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                key={index}
                >
                Mer info
              </a>
            </div>
          </div>
      ))}
      </div>
    </div>
  );
}

export default Accomodation;
