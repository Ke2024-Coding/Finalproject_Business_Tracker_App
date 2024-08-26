
const Budget = require('../models/Budget');

const getCurrentRemainingBudget=async (req, res) => {
    try {
      const budget = await Budget.findOne();
      if (!budget) {
        return res.status(200).json({ remainingBudget: 0 });
      }
      res.status(200).json({ remainingBudget: budget.remainingBudget });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching budget', error });
    }
  }

module.exports ={getCurrentRemainingBudget}