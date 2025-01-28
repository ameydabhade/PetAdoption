const Pet = require('../models/Pet');

exports.getNotifications = async (req, res) => {
  try {
    const newPets = await Pet.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(newPets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};
