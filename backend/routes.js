import { login, createUser, fetchUsers } from "../controller/Users.Controller.js";
import { createPet, fetchPets, fetchPetById, updatePet, deletePet } from "../controller/Pets.Controller.js";
import mongoose from 'mongoose';

function validateObjectId(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Pet ID' });
  }
  next();
}

export function Routes(app) {
  app.post('/register', createUser);
  app.post('/login', login);
  app.get('/users', fetchUsers);
  app.post('/pets', createPet);
  app.get('/pets', fetchPets);
  app.get('/pets/:id', validateObjectId, fetchPetById);
  app.put('/pets/:id', validateObjectId, updatePet);
  app.delete('/pets/:id', validateObjectId, deletePet);
}
