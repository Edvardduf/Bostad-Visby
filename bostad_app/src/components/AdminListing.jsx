import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// TODO Göra om så att det passar våran listings.

function AdminListing(listings) {
  // Add listing form

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [listing, setListings] = useState([]);
  const listArr = listings.listings;

  async function deleteListings(listingId) {
    try {
      const response = await fetch(`http://localhost:8000/listings/${listingId}`, {
      method: "DELETE",  
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      deleteListingFromState(listingId);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteModalOpen(false);
      window.location.reload();
    }
  }


  function deleteListingFromState(listingId) {
    const newListings = listing.filter((listing) => listing.id !== listingId);
    setListings(newListings);
  }

  return (
    <div className="min-w-xl">
      <div className="overflow-x-auto border shadow-md">
        <table className="min-w-full divide-y divide-gray-300 mx-4">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                ID
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Titel
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Pris
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Beskrivning
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Adress
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Bäddar
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Bilder
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Prio
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Tomt
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Läge
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Anteckningar
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Provision
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Bostadstyp
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Mail till uthyrare
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Boyta
              </th>
              <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Ändra</span>
              </th>
              <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Radera</span>
              </th>
            </tr>
          </thead>
          {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex overflow-auto bg-gray-800 bg-opacity-50">
            <div className="relative flex flex-col w-full max-w-md p-8 m-auto bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">Bekräfta borttagning</h2>
              <p className="my-4">Är du säker på att du vill ta bort Annonsen?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 text-black bg-gray-200 rounded"
                >
                  Avbryt
                </button>
                <button
                  onClick={() => deleteListings(selectedListingId)}
                  className="px-4 py-2 text-white bg-red-600 rounded"
                >
                  Radera
                </button>
              </div>
            </div>
          </div>
        )}
          <tbody className="divide-y divide-gray-200">
          {listArr ? (
              listArr.map((listing, index) => (
                <tr key={index} className="h-16">
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">{listing.id}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{listing.title}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{listing.weeks.map((item) => (<p key={item}>Vecka {item.week_number}: {item.price}kr</p>))}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{listing.description}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{listing.address}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{listing.beds}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{listing.img.map((item) => (<img src={item.url} key={item.url}/>))}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{listing.featured ? "Ja" : "Nej"}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{listing.lot_size}m²</td>
                  <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{listing.neighborhood.area}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{(listing.notes && listing.notes.text) ?? 'N/A'}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{(listing.notes && listing.notes.provision) ?? 'N/A'}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{listing.property.name}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{listing.renter.mail}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{listing.sq_feet}m²</td>
                  <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Ändra<span className="sr-only"></span></a>
                  </td>
                  <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                    <button className="ml-8 text-red-700 hover:text-red-900" onClick={() => {
                              setDeleteModalOpen(true);
                              setSelectedListingId(listing.id);
                            }}>Radera<span className="sr-only"></span></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 px-3 text-sm text-gray-500 text-center">Inga Annonser tillgängliga</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminListing;
