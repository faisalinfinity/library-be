const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");

const authorizationMiddleware = async (req, res, next) => {
  var token;
  if (req.headers.authorization) {
    token = req?.headers?.authorization.split(" ")[1];
  } else {
    return res.status(400).send("Please pass token in the headers");
  }

  if (token == undefined) return res.status(400).send("Invalid Token");

  try {
    var decoded = jwt.verify(token, "faisal");
  } catch (error) {
    res.status(404).send(error.message);
  }

  if (decoded) {
    let user = await userModel.find({ _id: decoded.userId });

    if (user.length && user[0].isAdmin) {
      req.body.userId = decoded.userId;
      next();
    } else {
      res.status(400).send("You are not an Admin");
    }
  }
};

const authorizationUserMiddleware = async (req, res, next) => {
  var token;
  if (req.headers.authorization) {
    token = req?.headers?.authorization.split(" ")[1];
  } else {
    return res.status(400).send("Please Login First");
  }

  if (token == undefined) return res.status(400).send("Invalid Token");

  try {
    var decoded = jwt.verify(token, "faisal");
  } catch (error) {
    res.status(404).send(error.message);
  }

  if (decoded) {
    let user = await userModel.find({ _id: decoded.userId });

    if (user.length) {
      req.body.user = decoded.userId;
      next();
    } else {
      res.status(400).send("Please Login First");
    }
  }
};

module.exports = {
  authorizationMiddleware,
  authorizationUserMiddleware,
};
