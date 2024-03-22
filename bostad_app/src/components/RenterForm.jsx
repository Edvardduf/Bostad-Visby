import React, { useState } from 'react';

// Just a basic renter form, Will be improved later on. 

function RentersForm() {
  const [formData, setFormData] = useState({
    mail: '',
    phone_number: '',
    first_name: '',
    last_name: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/renters/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
      // Handle success, 
      alert("Renter created successfully!");
    } catch (error) {
      console.error("Failed to submit the form:", error);
      // Handle errors, e.g., showing an error message to the user
      alert("Failed to create renter.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto my-10 p-4">
      <div>
        <label htmlFor="mail" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="mail"
          id="mail"
          value={formData.mail}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          name="phone_number"
          id="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <button type="submit" className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
}

export default RentersForm;
