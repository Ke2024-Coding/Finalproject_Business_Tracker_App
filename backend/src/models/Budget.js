const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  remainingBudget: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Budget', BudgetSchema);
