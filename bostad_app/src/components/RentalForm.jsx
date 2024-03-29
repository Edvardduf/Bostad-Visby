import React, { useState } from 'react';

function RentalForm({ listingId }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    isCompany: false,
    company: '',
    listingId: listingId,
    weekNumber: '',
    additionalInfo: '',
    agreedToTerms: false,

  });
  const [validationErrors, setValidationErrors] = useState({});
  const [submitFeedback, setSubmitFeedback] = useState('');

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
    validateField(name, type === 'checkbox' ? checked : value);
  };

  const handleWeekSelection = (event) => {
    const { value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      weekNumber: value
    }));
  };
  

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Invalid email format.';
    } else if ((name === 'name' || name === 'listingId' || name === 'additionalInfo') && !value.trim()) {
      error = 'This field is required.';
    }
    setValidationErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Correcting field names and ensuring integer parsing where necessary
    const submissionData = {
      email: formData.email,
      phone: parseInt(formData.phone, 10) || 0, // Default to 0 if NaN
      is_company: formData.isCompany,
      company: formData.company || "", // Ensure string, default to empty if undefined
      listing_id: parseInt(formData.listingId, 10) || 0, // Default to 0 if NaN
      week_number: parseInt(formData.weekNumber.replace('Week ', ''), 10) || 0, // Default to 0 if NaN or parsing fails
      additional_info: formData.additionalInfo || "", // Ensure string, default to empty if undefined
    };
  
    try {
      const response = await fetch('http://localhost:8000/rental-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
  
      if (!response.ok) {
        console.log(Error)
        console.log(submissionData)
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log(responseData);
      
      // Reset form or provide feedback on success
      setSubmitFeedback("Form submitted successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitFeedback("An error occurred while submitting the form.");
    }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto my-10  py-4 px-4 sm:px-6 lg:px-8 rounded-sm" style={{
      background:
        "linear-gradient(to bottom, #FFFFFF, #EBF5FB, #E8F8F5, #E8F6F3, #EAFAF1, #EBF5FB, #FFFFFF )",
    }}>
      <div className='text-2xl font-bold text-gray-900 text-center'>
        <h1>Bokningsförfrågan</h1>
        <p className='text-sm font-normal text-left text-gray-600 pt-2'>Om ni skickar bokningsförfrågningar på fler än ett objekt - maila då även till info@bostadvisby.se och berätta eller så skriver ni det i "Önskemål/Övrigt" delen av detta formulär</p>
      </div>
      <div className="flex flex-col">
        <label className="font-semibold" htmlFor="email">E-post*</label>
        <input
          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {validationErrors.email && <p className="text-red-500 text-sm">{validationErrors.email}</p>}
      </div>


      <div className="flex flex-col">
        <label className="font-semibold" htmlFor="name">Namn</label>
        <input
          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold" htmlFor="phone">Telefon / Mobil</label>
        <input
          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col">
          <label className="font-semibold" htmlFor="listingId">Intresserad av objekt #</label>
          <input
            className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            name="listingId"
            id="listingId"
            value={formData.listingId}
            onChange={handleInputChange}
          />

        </div>
        <div className="flex flex-col">
        <label htmlFor="weekNumber" className="font-semibold">Vill hyra veckonummer</label>
        <select
          name="weekNumber"
          id="weekNumber"
          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={formData.weekNumber}
          onChange={handleWeekSelection}
          defaultValue=""
        >
          <option value="" disabled>Välj vecka</option>
          {Array.from({ length: 10 }, (_, i) => i + 25).map(week => (
            <option key={week} value={`Week ${week}`}>Vecka {week}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold" htmlFor="additionalInfo">Önskemål / övrigt</label>
        <textarea
          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="additionalInfo"
          id="additionalInfo"
          maxLength="250" // To ensure no spam.
          value={formData.additionalInfo}
          onChange={handleInputChange}
        ></textarea>
      </div>

      {/* Company checkbox and conditional input field */}
      <div className="flex flex-col">
        <label className="inline-flex items-center mt-3">
          <input
            type="checkbox"
            name="isCompany"
            checked={formData.isCompany}
            onChange={handleInputChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          /><span className="ml-2">Representerar du ett Företag?</span>
        </label>
        {formData.isCompany && (
          <input
            className="mt-1 p-2 border border-gray-300 rounded"
            type="text"
            name="company"
            placeholder="Företagsnamn"
            value={formData.company}
            onChange={handleInputChange}
          />
        )}
      </div>

      {/* Terms and Privacy Policy agreement checkboxes */}
      <div className="flex flex-col">
        <label className="inline-flex items-center mt-3">
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleInputChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          /><span className="ml-2">Jag godkänner Bostad Visbys <a href="https://bostadvisby.se/villkor-bokning.pdf" className='text-blue-400'>Bokningsvillkor</a></span>
        </label>
      </div>

      <button
        type="submit"
        className="bg-sky-300 hover:bg-sky-400 text-white font-bold py-2 px-4 rounded w-full sm:w-auto sm:px-8">
        Skicka förfrågan
        </button>
        {submitFeedback && <p className="text-center mt-4 text-sm text-blue-500">{submitFeedback}</p>}
        </form>
        );
        }
        
  export default RentalForm;
