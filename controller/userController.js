
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { userModel } = require("../models/userModel");
const saltRounds = 10;

 const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let data = await userModel.find({ email: email });

    if (data.length == 0) {
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
          res.send(err.message);
        } else {
          req.body.password = hash;
          let newUser = new userModel(req.body);
          await newUser.save();
          res.status(201).send("User Registered Successfully");
        }
      });
    } else {
      res.status(404).send("User Already Registered");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

 const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let data = await userModel.find({ email: email });

    if (data.length == 0) {
      res.status(404).send("User not found !");
    } else {
      let hash = data[0].password;
      bcrypt.compare(password, hash, function (err, result) {
        if (result) {
          res
            .status(201)
            .json({ token: jwt.sign({ userId: data[0]._id },"faisal")});
        } else {
          res.status(404).send("Incorrect password");
        }
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports={
    registerUser,
    loginUser
}
