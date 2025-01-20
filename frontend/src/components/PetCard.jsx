import { useState, useEffect } from "react";

const PetCard = () => {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({
    breed: "",
    size: "",
    age: "",
  });

  useEffect(() => {
    fetchPets();
  }, [filters]);

  const fetchPets = async () => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`http://localhost:3000/pets?${queryParams}`);
    const data = await response.json();
    setPets(data);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Filter Pets</h2>
        <div className="grid grid-cols-3 gap-4">
          <select
            name="breed"
            value={filters.breed}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Breeds</option>
            <option value="labrador">Labrador</option>
            <option value="persian">Persian</option>
            <option value="siamese">Siamese</option>
          </select>

          <select
            name="size"
            value={filters.size}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Sizes</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>

          <select
            name="age"
            value={filters.age}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Ages</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={pet.photo}
              alt={pet.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
              <p className="text-gray-600 mb-2">Breed: {pet.breed}</p>
              <p className="text-gray-600 mb-2">Age: {pet.age}</p>
              <p className="text-gray-600">{pet.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetCard;
