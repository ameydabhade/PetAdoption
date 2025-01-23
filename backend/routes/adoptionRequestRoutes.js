const express = require('express');
const { submitAdoptionRequest } = require('../controllers/adoptionRequestController');
const router = express.Router();

router.post('/', submitAdoptionRequest);

module.exports = router;
