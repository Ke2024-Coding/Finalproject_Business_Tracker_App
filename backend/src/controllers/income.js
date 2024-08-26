const Income = require('../models/Income');
const Budget = require('../models/Budget');
const addIncome=async (req, res) => {
    const { amount, date, category } = req.body;
    if (!amount || !date || !category) {
      return res.status(400).json({ message: 'All the fields are required' });
    }
    try {
      const newIncome = new Income({ amount, date, category });
      const savedIncome = await newIncome.save();
  
        const budget = await Budget.findOne();
        if (!budget) {
          await Budget.create({ remainingBudget: amount });
        } else {
          budget.remainingBudget += amount;
          await budget.save();
        }
  
      res.status(201).json(savedIncome);
    } catch (error) {
      res.status(500).json({ message: 'Failed to add income', error });
    }
  }

  const getCurrentMonthIncome=async (req, res) => {
    try {
      const totalIncome = await Income.aggregate([
        { $match: { date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);
      res.json({ total: totalIncome[0] ? totalIncome[0].total : 0 });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch income', error });
    }
  }


  module.exports= {addIncome, getCurrentMonthIncome}