import React, { useState } from 'react';

const AdoptionFormPage = () => {

  const [formData, setFormData] = useState({
    seekerName: '',
    seekerContact: '',
    applicationMessage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add logic to send the data to a server here
  };


  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Adoption Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="seekerName" className="text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            id="seekerName"
            name="seekerName"
            value={formData.seekerName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="seekerContact" className="text-sm font-semibold mb-2">Contact</label>
          <input
            type="text"
            id="seekerContact"
            name="seekerContact"
            value={formData.seekerContact}
            onChange={handleChange}
            placeholder="Enter your contact information"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="applicationMessage" className="text-sm font-semibold mb-2">Message</label>
          <textarea
            id="applicationMessage"
            name="applicationMessage"
            value={formData.applicationMessage}
            onChange={handleChange}
            placeholder="Why do you want to adopt?"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdoptionFormPage;
