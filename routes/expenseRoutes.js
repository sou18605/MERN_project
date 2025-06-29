const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// @route GET /api/expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    console.log("Fetched expenses count:", expenses.length);
    res.json(expenses);
  } catch (err) {
    console.error("❌ Error fetching expenses:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// @route POST /api/expenses
router.post("/", async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      title,
      amount,
      category,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    console.error("❌ Error adding expense:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ @route DELETE /api/expenses/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted", id: req.params.id });
  } catch (err) {
    console.error("❌ Error deleting expense:", err);
    return res.status(500).json({ message: "Delete Failed", error: err.message });
  }
});

module.exports = router;
