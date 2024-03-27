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
      const response = await fetch('http://localhost:8000/renter/', {
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto my-10 p-8 bg-white rounded-lg shadow-lg">
       <div className='text-3xl font-bold text-center text-gray-900 mb-6'>
        <h1>Hyra ut</h1>
        <h2 className=' text-base font-semibold pt-1'>Vad kul att du vill hyra genom Bostad Visby!</h2>
        <p className='text-sm font-medium pt-1'>Var vänlig och fyll ut dessa fält för att fortsätta</p>
      </div>
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
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Telefon nummer</label>
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
        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Förnamn</label>
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
        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Efternamn</label>
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

      <button type="submit" className="mt-4 px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 w-full">
      Skicka
      </button>
    </form>
  );
}

export default RentersForm;
