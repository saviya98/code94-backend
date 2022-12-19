const express = require("express");
const router = express.Router();
const { addFavourite } = require("../Controllers/FavouritesController");

router.post("/", addFavourite);

module.exports = router;
