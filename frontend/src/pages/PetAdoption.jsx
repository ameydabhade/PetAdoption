import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PET_LISTINGS_URL, ADOPTION_FORM_URL } from "../utils/URLs";

export const PetAdoption = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [formData, setFormData] = useState({
    seekerName: "",
    seekerContact: "",
    applicationMessage: "",
  });

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`${PET_LISTINGS_URL}/${id}`);
        const data = await response.json();
        setPet(data);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };
    fetchPetDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(ADOPTION_FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petId: id,
          ...formData,
        }),
      });
      if (response.ok) {
        alert("Adoption application submitted successfully!");
        setFormData({
          seekerName: "",
          seekerContact: "",
          applicationMessage: "",
        });
      }
    } catch (error) {
      console.error("Error submitting adoption form:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!pet) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pet Details Section */}
        <div className="border rounded-lg overflow-hidden shadow-lg">
          <img
            src={pet.photo}
            alt={pet.name}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">{pet.name}</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Breed:</span> {pet.breed}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Age:</span> {pet.age} years
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Size:</span> {pet.size}
              </p>
              <p className="text-gray-700 mt-4">{pet.description}</p>
            </div>
          </div>
        </div>

        {/* Adoption Form Section */}
        <div className="border rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Adoption Application</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="seekerName"
                value={formData.seekerName}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Contact Information
              </label>
              <textarea
                name="seekerContact"
                value={formData.seekerContact}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Why do you want to adopt this pet?
              </label>
              <textarea
                name="applicationMessage"
                value={formData.applicationMessage}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
