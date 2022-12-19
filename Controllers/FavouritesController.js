const Favourite = require("../Models/FavouritesModel");
const User = require("../Models/UserModel");

const addFavourite = async (req, res) => {
  try {
    await Favourite.save()
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
        result.products.forEach((element) => {
          User.findByIdAndUpdate(element, {
            $push: {
              favorites: result._id,
            },
          })
            .then((data) => {
              console.log(data);
              res.status(200).json(data);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = { addFavourite };
