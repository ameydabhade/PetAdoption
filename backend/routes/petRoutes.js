const express = require('express');
const { getPets, addPet } = require('../controllers/petController');
const router = express.Router();

router.get('/', getPets);
router.post('/', addPet);

module.exports = router;
