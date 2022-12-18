const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userLoging = async (username, password) => {
  console.log("inside service");
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      resolve({
        status: 200,
        obj: {
          _id: user._id,
          username: user.username,
          token: generateToken(user._id, user.role),
          role: user.role,
        },
      });
    } else {
      reject({ status: 400, obj: "invalid" });
    }
  });
};

const UserRegistration = async (username, password, role) => {
  return new Promise(async (resolve, reject) => {
    const isAvailable = await User.findOne({ username });

    if (isAvailable) {
      return { status: 400, obj: "invalid" };
    } else {
      const saltedVal = await bcrypt.genSalt(10);
      const hashedPW = await bcrypt.hash(password, saltedVal);

      const userDetails = await User.create({
        username,
        password: hashedPW,
        role,
      });

      if (userDetails) {
        resolve({
          status: 201,
          obj: {
            _id: userDetails._id,
            username: userDetails.username,
            role: userDetails.role,
          },
        });
      } else {
        reject({ status: 400 });
      }
    }
  });
};

const generateToken = (id, role) => {
  if (role === "Admin") {
    let data = {
      permission: ["01"],
      role: "Admin",
      id: id,
    };
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }
};

module.exports = { userLoging, UserRegistration };