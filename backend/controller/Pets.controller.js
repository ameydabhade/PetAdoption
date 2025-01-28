import PetModel from '../Model/Pets.model.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

export async function createPet(req, res) {
    const { title, date, location, image, category, role } = req.body; // Added category

    if (role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to create pets.' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Invalid input', errors: errors.array() });
    }

    try {
        const newPet = new PetModel({
            title,
            date,
            location,
            image,
            category, // Added category to the new pet
        });

        const savedPet = await newPet.save();

        if (!savedPet) {
            return res.status(400).json({ message: 'Something went wrong while saving pet' });
        }

        res.status(201).json(savedPet);
    } catch (err) {
        console.error('Error saving pet:', err);
        res.status(500).json({ message: 'Error saving pet', error: err.message });
    }
}

export async function fetchPets(req, res) {
    try {
        const pets = await PetModel.find();
        if (pets.length === 0) {
            return res.status(404).json({ message: 'No pets found' });
        }

        res.status(200).json(pets);
    } catch (err) {
        console.error('Error fetching pets:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function fetchPetById(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Pet ID' });
    }

    try {
        const pet = await PetModel.findById(id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json(pet);
    } catch (err) {
        console.error('Error fetching pet:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}

export async function updatePet(req, res) {
    const { id } = req.params;
    const { title, date, location, image, category, role } = req.body; // Added category

    if (role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to update pets.' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Pet ID' });
    }

    try {
        const updatedPet = await PetModel.findByIdAndUpdate(
            id,
            { title, date, location, image, category }, // Included category in the update
            { new: true, runValidators: true }
        );

        if (!updatedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json(updatedPet);
    } catch (err) {
        console.error('Error updating pet:', err);
        res.status(500).json({ message: 'Error updating pet', error: err.message });
    }
}

export async function deletePet(req, res) {
    const { id } = req.params;
    const { role } = req.body;

    if (role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to delete pets.' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Pet ID' });
    }

    try {
        const deletedPet = await PetModel.findByIdAndDelete(id);

        if (!deletedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (err) {
        console.error('Error deleting pet:', err);
        res.status(500).json({ message: 'Error deleting pet', error: err.message });
    }
}
