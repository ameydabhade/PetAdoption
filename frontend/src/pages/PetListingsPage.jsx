import { useState, useEffect } from "react";
import { PET_LISTINGS_URL } from "../utils/URLs";
import { Link } from "react-router-dom";

const PetListingsPage = () => {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({
    breed: "",
    size: "",
    age: "",
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            queryParams.append(key, value);
          }
        });
        const response = await fetch(
          `${PET_LISTINGS_URL}?${queryParams.toString()}`
        );

        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, [filters]);

  const breeds = pets.map((pet) => pet.breed);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Available Pets</h2>

        {/* Filter Section */}
        <div className="flex gap-4 mb-6">
          <select
            className="border p-2 rounded"
            value={filters.breed}
            onChange={(e) => setFilters({ ...filters, breed: e.target.value })}
          >
            <option value="">All Breeds</option>
            {breeds.map((breed, index) => (
              <option key={index} value={breed}>
                {breed}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            value={filters.size}
            onChange={(e) => setFilters({ ...filters, size: e.target.value })}
          >
            <option value="">All Sizes</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <select
            className="border p-2 rounded"
            value={filters.age}
            onChange={(e) => setFilters({ ...filters, age: e.target.value })}
          >
            <option value="">All Ages</option>
            <option value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="4">4 years</option>
          </select>
        </div>

        {/* Pet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <div
                key={pet._id}
                className="border rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={pet.photo}
                  alt={pet.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
                  <p className="text-gray-600 mb-2">{pet.breed}</p>
                  <p className="text-gray-600 mb-2">Age: {pet.age} years</p>
                  <p className="text-gray-600 mb-2">Size: {pet.size}</p>
                  <p className="text-gray-700">{pet.description}</p>
                  <Link
                    to={`/pet/${pet._id}`}
                    className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Adopt
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-xl text-gray-600">
                No pets found matching your filters
              </p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setFilters({ breed: "", size: "", age: "" })}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetListingsPage;
