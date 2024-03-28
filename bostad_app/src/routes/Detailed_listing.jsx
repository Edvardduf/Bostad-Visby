import RentalForm from "@/components/RentalForm";
import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    <div>
      <Navbar></Navbar>
    <div className="flex justify-center w-full h-full"style={{
      background:
        "linear-gradient(to bottom, #FFFFFF, #EBF5FB, #E8F8F5, #E8F6F3, #EAFAF1, #FFFFFF )",
    }}>
      {initResponse ? (
        <div className="flex flex-col lg:flex-row justify-center items-start max-w-7xl mx-auto px-4 py-8 w-full space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="w-full lg:w-2/3 space-y-8">
            {/* Listing Title */}
            <h2 className="text-3xl font-semibold mb-4">{initResponse.title}</h2>

            {/* Listing Image */}
            {initResponse.img.map((item) => (
              <img src={item.url} alt="Listing" className="rounded-lg mb-4" key={item.url} />
            ))}

            {/* Listing Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left Column */}
              <div>
                <p className="text-black mb-2">
                  <span className="font-semibold">Adress: </span>
                  {initResponse.address}
                </p>
                <p className="text-black mb-2">
                  {initResponse.weeks.map((item, index) => (
                    <span className=" font-normal" key={index}> Vecka {item.week_number}: {item.price} kr</span>
                  ))}
                </p>
                <p className="text-black mb-2">
                  <span className="font-semibold">Bäddar: </span>
                  {initResponse.beds}
                </p>
                <p className="text-black mb-2">
                  <span className="font-semibold">Boarea: </span>
                  {initResponse.sq_feet}m²
                </p>
              </div>

              {/* Right Column */}
              <div>
                <p className="text-black mb-2">
                  <span className="font-semibold">Tomt:</span> {initResponse.lot_size}m²
                </p>
                <p className="text-black mb-2">
                  <span className="font-semibold">Bostadstyp:</span> {initResponse.property.name}
                </p>
                <p className="text-black mb-2">
                  <span className="font-semibold">Läge: </span>
                  {initResponse.neighborhood["area"]}
                </p>
              </div>
            </div>

            {/* Listing Description */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Beskrivning</h3>
              <p className="text-black">{initResponse.description}</p>
            </div>
          </div>

          {/* Rental Form - Adjusted to the Right Side */}
          <div className="w-full lg:w-1/3">
          <RentalForm listingId={listingId} />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
    <Footer></Footer>
    </div>
  );
}

export default Detailed_listing;
