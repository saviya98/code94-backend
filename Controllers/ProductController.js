const Product = require("../Models/ProductModel");

//creating new product
const addProduct = async (req, res) => {
  try {
    let imagesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
      };
      imagesArray.push(file);
    });
    const { sku, qty, name, description, userId } = req.body;
    const product = Product({
      sku,
      qty,
      name,
      description,
      imagesArray,
      userId
    });

    await product
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//retrieve all products
const getAllProducts = async (req, res) => {
  await Product.find({})
    .then((data) => {
      res.status(200).send({
        data: data,
      });
    })
    .catch((error) => {
      res.status(500).send({
        error: error.message,
      });
    });
};

//retrieve single product 
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findById(id)
      .then((data) => {
        res.status(200).send({
          data: data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          error: error.message,
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//delete product
const deleteProduct = (req, res) => {
  const { id } = req.params;
  try {
    Product.findByIdAndDelete(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

//search products
const searchProduct = (req, res) => {
  const query = req.params.name;
  try {
    Product.find({ name: { $regex: query, $options: "$i" } })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json("Error: " + error);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  searchProduct,
};
