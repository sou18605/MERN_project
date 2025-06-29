const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addExpense = async (req, res) => {
  const { title, amount, category } = req.body;
  try {
    const newExpense = new Expense({ title, amount, category, user: req.userId });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
