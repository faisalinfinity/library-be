const express = require("express");
const { orderModel } = require("../models/orderModel");
const { postOrder, getOrder } = require("../controller/orderController");
const { authorizationMiddleware, authorizationUserMiddleware } = require("../middlewares/authorizationMiddleware");
const orderRoute = express.Router();

orderRoute.post("/order",authorizationUserMiddleware,postOrder);
orderRoute.get("/order",authorizationMiddleware, getOrder);

module.exports = {
  orderRoute,
};
