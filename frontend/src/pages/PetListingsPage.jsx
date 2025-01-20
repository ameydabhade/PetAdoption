import { useState, useEffect } from "react";

const PetListingsPage = () => {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Max",
      breed: "Golden Retriever",
      age: 2,
      size: "Large",
      image:
        "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=1000&fit=crop",
      description: "Friendly and energetic dog who loves to play fetch",
    },
    {
      id: 2,
      name: "Luna",
      breed: "Siamese Cat",
      age: 1,
      size: "Medium",
      image:
        "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=1000&fit=crop",
      description:
        "Elegant and vocal cat who enjoys cuddles and window watching",
    },
    {
      id: 3,
      name: "Rocky",
      breed: "German Shepherd",
      age: 3,
      size: "Large",
      image:
        "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=1000&fit=crop",
      description: "Intelligent and loyal companion, great with training",
    },
    {
      id: 4,
      name: "Bella",
      breed: "French Bulldog",
      age: 1,
      size: "Small",
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&fit=crop",
      description: "Playful and affectionate pup who loves short walks",
    },
    {
      id: 5,
      name: "Oliver",
      breed: "Maine Coon",
      age: 4,
      size: "Large",
      image:
        "https://images.unsplash.com/photo-1603314585442-ee3b3c16fbcf?q=80&w=1000&fit=crop",
      description:
        "Gentle giant with a luxurious coat and friendly personality",
    },
    {
      id: 6,
      name: "Charlie",
      breed: "Labrador",
      age: 2,
      size: "Large",
      image:
        "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?q=80&w=1000&fit=crop",
      description: "Sweet-natured lab who excels at swimming and fetch",
    },
    {
      id: 7,
      name: "Milo",
      breed: "Beagle",
      age: 1,
      size: "Medium",
      image:
        "https://images.unsplash.com/photo-1605897472359-85e4b94d685d?q=80&w=1000&fit=crop",
      description: "Curious and adventurous pup with a great nose",
    },
    {
      id: 8,
      name: "Lucy",
      breed: "Persian Cat",
      age: 3,
      size: "Medium",
      image:
        "https://images.unsplash.com/photo-1616046619793-7e4badf3fe1f?q=80&w=1000&fit=crop",
      description: "Calm and dignified cat who enjoys peaceful environments",
    },
    {
      id: 9,
      name: "Cooper",
      breed: "Australian Shepherd",
      age: 2,
      size: "Medium",
      image:
        "https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?q=80&w=1000&fit=crop",
      description: "High-energy herding dog, perfect for active families",
    },
  ]);

  const [filters, setFilters] = useState({
    breed: "",
    size: "",
    age: "",
  });

  const filteredPets = pets.filter((pet) => {
    return (
      (!filters.breed || pet.breed === filters.breed) &&
      (!filters.size || pet.size === filters.size) &&
      (!filters.age || pet.age === parseInt(filters.age))
    );
  });

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
            <option value="Golden Retriever">Golden Retriever</option>
            <option value="Siamese Cat">Siamese Cat</option>
            <option value="German Shepherd">German Shepherd</option>
            <option value="French Bulldog">French Bulldog</option>
            <option value="Maine Coon">Maine Coon</option>
            <option value="Labrador">Labrador</option>
            <option value="Beagle">Beagle</option>
            <option value="Persian Cat">Persian Cat</option>
            <option value="Australian Shepherd">Australian Shepherd</option>
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
            <option value="3">3+ years</option>
          </select>
        </div>

        {/* Pet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <div
                key={pet.id}
                className="border rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
                  <p className="text-gray-600 mb-2">{pet.breed}</p>
                  <p className="text-gray-600 mb-2">Age: {pet.age} years</p>
                  <p className="text-gray-600 mb-2">Size: {pet.size}</p>
                  <p className="text-gray-700">{pet.description}</p>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    View Details
                  </button>
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
