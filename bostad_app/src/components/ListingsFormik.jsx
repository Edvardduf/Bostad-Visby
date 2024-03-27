import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import debounce from "lodash/debounce";
import RentersForm from "./RenterForm";

const fetchPropertyTypes = async () => {
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
};

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
const today = new Date();
today.setHours(0, 0, 0, 0);

const ListingFormik = () => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showRenterModal, setShowRenterModal] = useState(false);

  useEffect(() => {
    fetchPropertyTypes().then(setPropertyTypes);
    fetchNeighborhoods().then(setNeighborhoods);
  }, []);

  const initialValues = {
    renterEmail: "",
    title: "",
    expiration_date: "",
    featured: false,
    address: "",
    beds: "",
    description: "",
    lot_size: 0,
    sq_feet: 0,
    property_type_id: "",
    neighborhood_id: "",
    images: [],
  };

  useEffect(() => {
    const loadFormData = async () => {
      const loadedPropertyTypes = await fetchPropertyTypes();
      setPropertyTypes(loadedPropertyTypes);
      const loadedNeighborhoods = await fetchNeighborhoods();
      setNeighborhoods(loadedNeighborhoods);
    };

    loadFormData();
  }, []);

  const validationSchema = Yup.object().shape({
    renterEmail: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    title: Yup.string().required("Required"),
    expiration_date: Yup.date()
      .min(today, "Expiration date can't be in the past")
      .required("Expiration date is required"),
    address: Yup.string().required("Address is required"),
    beds: Yup.number()
      .integer("Beds must be an integer")
      .positive("Beds must be positive")
      .required("Number of beds is required"),
    description: Yup.string()
      .max(1000, "Description cannot exceed 1000 characters")
      .required("Description is required"),
    lot_size: Yup.number()
      .positive("Lot size must be a positive number")
      .required("Lot size is required"),
    sq_feet: Yup.number()
      .positive("Square feet must be a positive number")
      .required("Square feet is required"),
    property_type_id: Yup.string().required("Property type is required"),
    neighborhood_id: Yup.string().required("Neighborhood is required"),
  });

  const checkRenterExistence = useCallback(
    debounce(async (email) => {
      try {
        const response = await fetch(
          `http://localhost:8000/renter/${encodeURIComponent(email)}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const exists = await response.json();
        setShowRenterModal(!exists); // Show modal only if renter doesn't exist
      } catch (error) {
        console.error("Error checking renter existence:", error);
        setShowRenterModal(false); // Assume renter doesn't exist on error, adjust as needed
      }
    }, 500),
    []
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Form data:", values);
    setSubmitting(false);
    // Handle form submission, such as sending data to your backend
  };

  const handleImageChange = (setFieldValue) => (e) => {
    const files = Array.from(e.target.files);
    setFieldValue("images", files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <div
      className="ml-4 rounded-lg shadow-lg max-w-3xl mx-auto my-8"
      style={{
        background:
          "linear-gradient(to bottom,#EAFAF1 , #EBF5FB, #E8F8F5, #E8F6F3, #D0ECE7, #D1F2EB, #EAFAF1 )",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
       {({ setFieldValue, values }) => (
        <>
        <Form className="space-y-6 p-4 shadow rounded-lg">
          <div>
            <label htmlFor="renterEmail" className="block text-base font-medium text-black">Email</label>
            <Field
              type="email"
              name="renterEmail"
              className="mt-1 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              onChange={e => {
                const { value } = e.target;
                setFieldValue("renterEmail", value);
                checkRenterExistence(value);
              }}
            />
            <ErrorMessage name="renterEmail" component="div" className="text-red-500" />
          </div>
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-base font-medium text-black"
              >
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="mt-1 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Expiration Date */}
            <div>
              <label
                htmlFor="expiration_date"
                className="block text-base font-medium text-black"
              >
                Expiration Date
              </label>
              <Field
                type="date"
                name="expiration_date"
                className="mt-1 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <ErrorMessage
                name="expiration_date"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Featured */}
            <div>
              <label htmlFor="featured" className="flex items-center">
                <Field
                  type="checkbox"
                  name="featured"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-base text-black">Featured</span>
              </label>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-base font-medium text-black"
              >
                Address
              </label>
              <Field
                type="text"
                name="address"
                className="mt-1 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Beds */}
            <div>
              <label
                htmlFor="beds"
                className="block text-base font-medium text-black"
              >
                Beds
              </label>
              <Field
                type="text"
                name="beds"
                className="mt-1 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <ErrorMessage
                name="beds"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-base font-medium text-black"
              >
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                rows="4"
                className="mt-1 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            {/* Property Type Select */}
            <div>
              <label
                htmlFor="property_type_id"
                className="block text-base font-medium text-black"
              >
                Property Type
              </label>
              <Field
                as="select"
                name="property_type_id"
                className="mt-2 py-1 px-2 block w-full rounded-md text-gray-800 border-gray-300 shadow-sm"
              >
                <option value="">Select Property Type</option>
                {propertyTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="property_type_id"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Neighborhood Select */}
            <div>
              <label
                htmlFor="neighborhood_id"
                className="block text-base font-medium text-black"
              >
                Neighborhood
              </label>
              <Field
                as="select"
                name="neighborhood_id"
                className="mt-2 py-1 px-2 block w-full rounded-md text-gray-800 border-gray-300 shadow-sm"
              >
                <option value="">Select Neighborhood</option>
                {neighborhoods.map((neighborhood) => (
                  <option key={neighborhood.id} value={neighborhood.id}>
                    {neighborhood.area}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="neighborhood_id"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Lot Size Input */}
            <div>
              <label
                htmlFor="lot_size"
                className="block text-base font-medium text-black"
              >
                Lot Size
              </label>
              <Field
                type="number"
                name="lot_size"
                className="mt-2 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <ErrorMessage
                name="lot_size"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Square Feet Input */}
            <div>
              <label
                htmlFor="sq_feet"
                className="block text-base font-medium text-black"
              >
                Square Feet
              </label>
              <Field
                type="number"
                name="sq_feet"
                className="mt-2 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm"
              />
              <ErrorMessage
                name="sq_feet"
                component="div"
                className="text-red-500 text-xs"
              />
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
                multiple
                onChange={handleImageChange(setFieldValue)}
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
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Submit Listing
            </button>
          </Form>
      
      {/* Modal Triggering based on showRenterModal state */}
      {showRenterModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            {/* Modal Panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Renter Information</h3>
                    <div className="mt-2">
                      {/* RentersForm is your component for handling the renter's information */}
                      <RentersForm onCreate={() => {}} renterEmail={values.renterEmail} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowRenterModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
        </>
      )}
      </Formik>
    </div>
  );
};

export default ListingFormik;
