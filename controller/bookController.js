const { bookModel } = require("../models/bookModel");

const getAllBooks = async (req, res) => {
  try {
    let data = await bookModel.find(req.query);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getSingleBook = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await bookModel.findOne({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const postBooks = async (req, res) => {
  try {
    let newBook = new bookModel(req.body);
    await newBook.save();
    res.status(201).json("Successfully posted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateBooks = async (req, res) => {
  const { id } = req.params;
  try {
    await bookModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(204).send("Data updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteBooks = async (req, res) => {
  const { id } = req.params;
  try {
    await bookModel.findByIdAndDelete({ _id: id });
    res.status(202).send("Deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  postBooks,
  updateBooks,
  deleteBooks,
};
