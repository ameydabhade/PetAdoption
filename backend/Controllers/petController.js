const Pet = require("../models/Pet");

// Fetch pets with filters
exports.getPets = async (req, res) => {
  try {
    const { breed, size, age } = req.query;
    const filters = {};
    if (breed) filters.breed = breed;
    if (size) filters.size = size;
    if (age) filters.age = age;

    const pets = await Pet.find(filters);
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pets", error });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

// Add new pet
exports.addPet = async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    await newPet.save();
    res.status(201).json({ message: "Pet added successfully", pet: newPet });
  } catch (error) {
    res.status(500).json({ message: "Error adding pet", error });
  }
};
