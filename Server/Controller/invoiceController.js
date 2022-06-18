const model = require("../Model/invoiceModel");

exports.home = async (req, res, next) => {
  try {
    const docs = await model.find();
    res.send(docs);
  } catch (err) {
    console.log(err);
  }
};

exports.insert = async (req, res, next) => {
  const data = req.body;
  console.log("Checking Data", data);
  try {
    const doc = await model.create(data);
    res.send(doc);
  } catch (err) {
    console.log(err);
  }
};
// delete invoice
exports.delete = async (req, res, next) => {
  const id = req.params.id;
  // console.log("Checking ID", id);
  // res.send(id)
  try {
    const doc = await model.findByIdAndDelete(id);
    res.send(doc);
  } catch (err) {
    console.log(err);
  }
};

exports.check = async (req, res, next) => {
  const data = req.body;
  console.log("Checking Data", data);
  try {
    const doc = await model.create(data);
    res.send(doc);
  } catch (err) {
    console.log(err);
  }
};

// Update invoice
exports.update = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  console.log("Checking Data", data);
  try {
    const doc = await model.findByIdAndUpdate(id, data, { new: true });
    res.send(doc);
  } catch (err) {
    console.log(err);
  }
};

// get invoice by id
exports.getById = async (req, res, next) => {
  const id = req.params.id;
  // console.log("Checking ID", id);
  try {
    const data = await model.findById(id).exec();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

// pending invoice
exports.pending = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  console.log("Checking Data", data);
  try {
    const doc = await model.findByIdAndUpdate(id, data);
    res.send(doc);
  } catch (err) {
    console.log(err);
  }
};
