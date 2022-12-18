const express = require("express");
const router = express.Router();
const { upload } = require("../Helpers/fileHelper");
const {
  addProduct,
  getAllProducts,
} = require("../Controllers/ProductController");

router.post("/", upload.array("files"), addProduct);
router.get("/", getAllProducts);

module.exports = router;
