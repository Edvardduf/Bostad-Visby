import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Detailed_listing() {
    const params = useParams();
    const { listingId } = params;
    // async function loader({ params }) {
    //     const detail = await getContact(params.Id);
    //     return { contact };
    //   }

    const [initResponse, setInitResponse] = useState([]);
    // console.log("This is Id:", id)
    // const listing = ""
  useEffect(() => {
    async function getDetailedListings() {
      try {
        const response = await fetch("http://localhost:8000/listings/" + listingId);
        const data = await response.json();
        console.log("Detailed data", data);
        setInitResponse(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getDetailedListings();
  }, []);

  return (
    <div>
        <p>ID from URL: {listingId}</p>
    </div>
//     <div className="container mx-auto mt-8">
//     <h1 className="text-3xl font-semibold mb-4">{listing.title}</h1>
//     <div className="flex flex-col md:flex-row">
//       <div className="md:w-1/2 md:pr-8">
//         <img src={listing.imageUrl} alt={listing.title} className="rounded-lg mb-4" />
//         <p className="text-lg mb-4">{listing.description}</p>
//       </div>
//       <div className="md:w-1/2">
//         <div className="bg-gray-100 p-4 rounded-lg">
//           <h2 className="text-xl font-semibold mb-2">Details</h2>
//           <p><strong>Price:</strong> ${listing.price}</p>
//           <p><strong>Location:</strong> {listing.location}</p>
//           <p><strong>Bedrooms:</strong> {listing.bedrooms}</p>
//           <p><strong>Bathrooms:</strong> {listing.bathrooms}</p>
//           <p><strong>Size:</strong> {listing.size} sq ft</p>
//           {/* Add more details as needed */}
//         </div>
//       </div>
//     </div>
//   </div>
  )
}

export default Detailed_listing