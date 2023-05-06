const { bookModel } = require("../models/bookModel");
const { orderModel } = require("../models/orderModel");
const { userModel } = require("../models/userModel");

const postOrder = async (req, res) => {
  try {
    let data = new orderModel(req.body);
    await data.save();
    res.status(201).send("Data Added");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOrder = async (req, res) => {
  let arr = [];
  try {
    let data = await orderModel.find();

    data.forEach(async (el) => {
      let user = await userModel.findOne({ _id: el.user });

      let order = el.books.map(async (e) => {
        return await bookModel.findOne({ _id: e });
      });
      console.log(order)
      let obj = {
        user: user,
        order: order,
        totalAmount:el.totalAmount
      };

      arr.push(obj);
    });


    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  postOrder,
  getOrder,
};
