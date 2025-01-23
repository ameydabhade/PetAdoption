const AdoptionRequest = require('../models/AdoptionRequest');

exports.submitAdoptionRequest = async (req, res) => {
  try {
    const newRequest = new AdoptionRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: 'Adoption request submitted successfully', request: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting adoption request', error });
  }
};
