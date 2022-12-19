const express = require("express");
const router = express.Router();
const { upload } = require("../Helpers/fileHelper");
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  searchProduct,
} = require("../Controllers/ProductController");

router.post("/", upload.array("files"), addProduct);
router.get("/", getAllProducts);
router.get("/singleProduct/:id", getSingleProduct);
router.delete("/:id", deleteProduct);
router.get("/search/:name", searchProduct);

module.exports = router;
