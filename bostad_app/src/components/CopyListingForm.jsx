import React, { useState, useEffect, useCallback } from "react";
import RentersForm from "./RenterForm";

function CopyListingForm() {
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, wait);
    };
  }
  // Simulated fetch functions for relationship fields
  async function fetchPropertyTypes() {
    try {
      const response = await fetch("http://localhost:8000/property");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return []; // Return an empty array in case of error
    }
  }
 async 

  const fetchNeighborhoods = async () => {
    try {
      const response = await fetch("http://localhost:8000/neighborhood");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return []; // Return an empty array in case of error
    }
  };

  const ListingForm = () => {
    const [formData, setFormData] = useState({
      title: "",
      expiration_date: "",
      featured: false,
      address: "",
      beds: "",
      description: "",
      lot_size: 0,
      sq_feet: 0,
      property_type_id: "",
      renter_id: "",
      user_id: "",
      neighborhood_id: "",
      images: [],
    });

    const [propertyTypes, setPropertyTypes] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
      fetchPropertyTypes().then(setPropertyTypes);
      fetchNeighborhoods().then(setNeighborhoods);
    }, []);

    const [renterExists, setRenterExists] = useState(null);
    const [showRenterModal, setShowRenterModal] = useState(false);

    const toggleRenterModal = () => {
      setShowRenterModal(!showRenterModal);
    };
    const checkRenterExistence = async (email) => {
      try {
        const response = await fetch(
          `http://localhost:8000/renter/${encodeURIComponent(email)}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const exists = await response.json();
        if (!exists) {
          setTimeout(() => setShowRenterModal(true), 500); // Delay showing the modal
        } else {
          setShowRenterModal(false);
        }
      } catch (error) {
        console.error("Error checking renter existence:", error);
        setShowRenterModal(false);
      }
    };

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (type === "checkbox") {
        setFormData({ ...formData, [name]: checked });
      } else {
        setFormData({ ...formData, [name]: value });
      }
      if (name === "renterEmail") {
        // Delay the existence check to avoid too frequent checks
        setTimeout(() => checkRenterExistence(value), 500);
      }
    };

    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      setFormData((prevState) => ({
        ...prevState,
        images: files,
      }));
      setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    };

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   console.log("Form data:", formData);
    //   // Here you would submit formData to your backend API
    // };
  };

  return (
    <div
      className=" ml-4 rounded-lg shadow-lg max-w-3xl mx-auto my-8"
      style={{
        background:
          "linear-gradient(to bottom,#EAFAF1 , #EBF5FB, #E8F8F5, #E8F6F3, #D0ECE7, #D1F2EB, #EAFAF1 )",
      }}
    >
      <form
        // onSubmit={handleSubmit}
        className="space-y-6 p-4  shadow rounded-lg"
      >
        <div>
          <label
            htmlFor="renterEmail"
            className="block text-base font-medium text-black"
          >
            Email
          </label>
          <input
            type="email"
            name="renterEmail"
            id="renterEmail"
            value={formData.renterEmail}
            onChange={handleChange}
            onBlur={formData.renterEmail}
            className="mt-1 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-base font-medium text-black"
          >
            Titel
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="expiration_date"
            className="block text-base font-medium text-black"
          >
            Expiration Date might delete
          </label>
          <input
            type="date"
            name="expiration_date"
            id="expiration_date"
            value={formData.expiration_date}
            onChange={handleChange}
            className="mt-1 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-base font-medium text-black"
          >
            Adress till objektet
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="beds"
            className="block pl-1 text-base font-medium text-black"
          >
            Antal Bäddar
          </label>
          <input
            type="text"
            name="beds"
            id="beds"
            value={formData.beds}
            onChange={handleChange}
            className="mt-1 py-1  px-2 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-base font-medium text-black"
          >
            Text som beskriver av bostaden och läget
          </label>
          <textarea
            name="description"
            id="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 py-1  px-2 block w-full rounded-md border-gray-300 shadow-sm"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="lot_size"
            className="block text-base font-medium text-black"
          >
            Tomt
          </label>
          <input
            type="number"
            name="lot_size"
            id="lot_size"
            value={formData.lot_size}
            onChange={handleChange}
            className="mt-1 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="sq_feet"
            className="block text-base font-medium text-black"
          >
            Antal kvadratmeter Bostad
          </label>
          <input
            type="number"
            name="sq_feet"
            id="sq_feet"
            value={formData.sq_feet}
            onChange={handleChange}
            className="mt-1 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        {/* Additional fields and logic for property_type_id, neighborhood_id, user_id, images, etc., should follow the same pattern */}
        <div>
          <label
            htmlFor="property_type_id"
            className="block text-lg font-semibold text-black"
          >
            Property Type
          </label>
          <select
            name="property_type_id"
            id="property_type_id"
            value={formData.property_type_id}
            onChange={handleChange}
            className="mt-2 py-3 px-2 block w-full rounded-md text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
          >
            <option value="">Select Property Type</option>
            {propertyTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="neighborhood_id"
            className="block text-base font-medium text-black"
          >
            Neighborhood
          </label>
          <select
            name="neighborhood_id"
            id="neighborhood_id"
            // value={formData.neighborhood_id}
            onChange={handleChange}
            className="mt-2 py-3 px-2 block w-full rounded-md text-gray-500 border-gray-300 shadow-sm focus:border-blue-200 focus:ring focus:ring-blue-300 focus:ring-opacity-50 sm:text-sm"
          >
            <option value="">Select Neighborhood</option>
            {neighborhoods.map((neighborhood) => (
              <option key={neighborhood.id} value={neighborhood.id}>
                {neighborhood.area}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="images"
            className="block text-lg font-semibold text-black"
          >
            Images
          </label>
          <input
            type="file"
            name="images"
            id="images"
            multiple
            onChange={handleImageChange}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div className="mt-4 grid grid-cols-3 gap-4">
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Preview"
                className="h-24 w-24 rounded-lg object-cover shadow-sm"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Listing
        </button>
      </form>
      {showRenterModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Renter Information
                    </h3>
                    <div className="mt-2">
                      <RentersForm
                      // onCreate={() => {}}
                      // renterEmail={formData.renterEmail}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={toggleRenterModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CopyListingForm;
