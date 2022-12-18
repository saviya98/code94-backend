const Product = require("../Models/ProductModel");

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
    const { sku, qty, name, description } = req.body;
    const product = Product({
      sku,
      qty,
      name,
      description,
      imagesArray,
    });

    await product
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }

  //   if (req.body) {
  //     const product = new Product(req.body);
  //     await product
  //       .save()
  //       .then((data) => {
  //         res.status(200).send({ data: data });
  //       })
  //       .catch((error) => {
  //         res.status(500).send({
  //           error: error.message,
  //         });
  //       });
  //   }
};

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

module.exports = { addProduct, getAllProducts };
