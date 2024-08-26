const Expense = require('../models/Expense');
const Budget = require('../models/Budget');

const addExpense=async (req, res) => {
    const { amount, date, category } = req.body;
    if (!amount || !date || !category) {
      return res.status(400).json({ message: 'All the fields are required' });
    }
    try {
      const budget = await Budget.findOne();
      if (budget) {
        if (budget.remainingBudget < amount) {
          return res.status(400).json({ message: 'Insufficient budget' });
        }
  
        budget.remainingBudget -= amount;
        await budget.save();
        const newExpense = new Expense({ amount, date, category });
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
  
      }
      else{
          return res.status(400).json({ message: 'Insufficient budget' });
     
      }
     
    } catch (error) {
      res.status(500).json({ message: 'Failed to add expense', error });
    }
  }

const getCurrentMonthExpense= async (req, res) => {
    try {
      const expenses = await Expense.find({ date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } });
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch expenses', error });
    }
  }

module.exports = {addExpense, getCurrentMonthExpense}