import React, { useState, useEffect } from "react";
import RentersForm from "./RenterForm";

// const fetchNeighborhoods = async () => {
//   try {
//     const response = await fetch("http://localhost:8000/neighborhood");
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("There was a problem with the fetch operation:", error);
//     return []; // Return an empty array in case of error
//   }
// };

const ListingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    expiration_date: "",
    // featured: false,
    address: "",
    beds: "",
    description: "",
    lot_size: "",
    sq_feet: 0,
    property_type_id: 0,
    renter_id: 0,
    user_id: 1,
    neighborhood_id: 0,
    images_url: "",
  });

  // function debounce(func, wait) {
  //   let timeout;
  //   return function executedFunction(...args) {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       func(...args);
  //     }, wait);
  //   };
  // }
  // Simulated fetch functions for relationship fields
  // const fetchPropertyTypes = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/property");
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //     return []; // Return an empty array in case of error
  //   }
  // };

  const [propertyTypes, setPropertyTypes] = useState(null);
  const [neighborhoods, setNeighborhoods] = useState(null);

  useEffect(() => {
    async function fetchPropertyTypes() {
      try {
        const response = await fetch("http://localhost:8000/property");
        const data = await response.json();
        setPropertyTypes(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
    fetchPropertyTypes();
  }, []);

  useEffect(() => {
    async function fetchNeighborhoods() {
      try {
        const response = await fetch("http://localhost:8000/neighborhood");
        const data = await response.json();
        setNeighborhoods(data);
        console.log(neighborhoods)
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
    fetchNeighborhoods();
  }, []);

  const parsedFormData = {
    ...formData,
    lot_size: parseInt(formData.lot_size),
    sq_feet: parseInt(formData.sq_feet),
    user_id: parseInt(formData.user_id),
    renter_id: parseInt(formData.renter_id),
    property_type_id: parseInt(formData.property_type_id),
    neighborhood_id: parseInt(formData.neighborhood_id),
  };

  // const [imagePreviews, setImagePreviews] = useState([]);

  const [renterExists, setRenterExists] = useState(null);
  const [showRenterModal, setShowRenterModal] = useState(false);

  const toggleRenterModal = () => {
    setShowRenterModal(!showRenterModal);
  };

  const checkRenterExistence = async (email) => {
    try {
      const response = await fetch(`http://localhost:8000/renters/${email}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const exists = await response.json();
      if (!exists) {
        setTimeout(() => setShowRenterModal(true), 1200); // Delay showing the modal
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
  };
  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     images: files,
  //   }));
  //   setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", parsedFormData);
    // Here you would submit formData to your backend API
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
        onSubmit={handleSubmit}
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
            onBlur={() => checkRenterExistence(formData.renterEmail)}
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
            Utgångdatum
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
        {/* <div>
          <label htmlFor="featured" className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-base text-black">Featured</span>
          </label>
        </div> */}
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
            Bostadstyp
          </label>
          <select
            name="property_type_id"
            id="property_type_id"
            value={formData.property_type_id}
            onChange={handleChange}
            className="mt-2 py-3 px-2 block w-full rounded-md text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
          >
            <option value="">Välj bostadstyp</option>
            {propertyTypes && propertyTypes.map((type) => (
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
            Läge
          </label>
          <select
            name="neighborhood_id"
            id="neighborhood_id"
            value={formData.neighborhood_id}
            onChange={handleChange}
            className="mt-2 py-3 px-2 block w-full rounded-md text-gray-500 border-gray-300 shadow-sm focus:border-blue-200 focus:ring focus:ring-blue-300 focus:ring-opacity-50 sm:text-sm"
          >
            <option value="">Välj läge</option>
            {neighborhoods && neighborhoods.map((neighborhood) => (
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
            Länk till bild
          </label>
          <input
            type="text"
            name="images_url"
            id="images_url"
            value={formData.images_url}
            onChange={handleChange}
            className="mt-1 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {/* <input
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
          </div> */}
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Skapa annonsförfrågan
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
                      Uthyrar Information
                    </h3>
                    <div className="mt-2">
                      <RentersForm
                        onCreate={() => {}}
                        renterEmail={formData.renterEmail}
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
};

export default ListingForm;
