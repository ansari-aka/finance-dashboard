const { validationResult } = require("express-validator");
const FinancialRecord = require("../models/FinancialRecord");

const createRecord = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { amount, type, category, date, notes } = req.body;

  const record = await FinancialRecord.create({
    amount,
    type,
    category,
    date,
    notes,
    createdBy: req.user._id,
  });

  res.status(201).json(record);
};

const getRecords = async (req, res) => {
  const {
    type,
    category,
    startDate,
    endDate,
    page = 1,
    limit = 10,
  } = req.query;

  const filter = {};

  if (type) filter.type = type;
  if (category) filter.category = category;

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const records = await FinancialRecord.find(filter)
    .populate("createdBy", "name email role")
    .sort({ date: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await FinancialRecord.countDocuments(filter);

  res.json({
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    records,
  });
};

const getRecordById = async (req, res) => {
  const record = await FinancialRecord.findById(req.params.id).populate(
    "createdBy",
    "name email role",
  );

  if (!record) {
    res.status(404);
    throw new Error("Record not found");
  }

  res.json(record);
};

const updateRecord = async (req, res) => {
  const record = await FinancialRecord.findById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error("Record not found");
  }

  record.amount = req.body.amount ?? record.amount;
  record.type = req.body.type || record.type;
  record.category = req.body.category || record.category;
  record.date = req.body.date || record.date;
  record.notes = req.body.notes ?? record.notes;

  const updatedRecord = await record.save();

  res.json(updatedRecord);
};

const deleteRecord = async (req, res) => {
  const record = await FinancialRecord.findById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error("Record not found");
  }

  await record.deleteOne();
  res.json({ message: "Record deleted successfully" });
};

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  getRecordById,
  deleteRecord,
};
