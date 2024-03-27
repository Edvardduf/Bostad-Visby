import RentalForm from "@/components/RentalForm";
import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detailed_listing() {
  const params = useParams();
  const { listingId } = params;

  const [initResponse, setInitResponse] = useState(null);

  useEffect(() => {
    async function getDetailedListings() {
      try {
        const response = await fetch(
          "http://localhost:8000/listings/" + listingId
        );
        const data = await response.json();
        setInitResponse(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getDetailedListings();
  }, []);

  return (
    <div>{ initResponse ? (
      <div className="max-w-4xl mx-auto px-4 py-8" style={{
        background:
          "linear-gradient(to bottom, #FFFFFF, #EBF5FB, #E8F8F5, #E8F6F3, #D0ECE7, #D1F2EB, #EAFAF1 )",
      }}>
        {/* Listing Title */}
        <h2 className="text-3xl font-semibold mb-4">{initResponse.title}</h2>

        {/* Listing Image */}
        { initResponse.img.map((item) => <img src={item.url} alt="Listing" className="rounded-lg mb-4" key={item.url}/>)
        }
        {/* Listing Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left Column */}
          <div>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Adress: </span>
              {initResponse.address}
            </p>
            <p className="text-gray-700 mb-2">
            { initResponse.weeks.map((item, index) => <span className="font-semibold" key={index}> Vecka: {item.week_number}: {item.price}kr</span> )}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Bäddar: </span>
              {initResponse.beds}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Boarea: </span>
              {initResponse.sq_feet}m²
            </p>
          </div>

          {/* Right Column */}
          <div>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Tomt:</span> {initResponse.lot_size}m²
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Bostadstyp:</span> {initResponse.property.name}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Läge: </span>
              {initResponse.neighborhood["area"]}
            </p>
          </div>
        </div>

        {/* Listing Description */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Beskrivning</h3>
          <p className="text-gray-700">{initResponse.title}</p>
        </div>
      

        {/* Contact Button */}
        <div className="mt-8">
          <RentalForm></RentalForm>
        </div>
      </div>) : (<Spinner></Spinner>)}
    </div>
  );
}

export default Detailed_listing;
