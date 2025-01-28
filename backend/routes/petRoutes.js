const express = require("express");
const { getPets, addPet, getPetById } = require("../controllers/petController");
const router = express.Router();

router.get("/", getPets);
router.get("/:id", getPetById);
router.post("/", addPet);

module.exports = router;
