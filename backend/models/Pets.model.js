import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
    },
    date: {
        type: String,
        required: true, 
    },
    location: {
        type: String,
        required: true, 
    },
    image: {
        type: String,
        required: false, 
    },
    category: { // The optional category field
        type: String,
        required: false, 
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const PetModel = mongoose.model('Pet', petSchema);
export default PetModel;
