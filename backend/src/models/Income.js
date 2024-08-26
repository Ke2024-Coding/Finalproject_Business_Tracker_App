const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Income', IncomeSchema);
