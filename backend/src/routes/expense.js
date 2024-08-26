const express = require('express');
const router = express.Router();
const {addExpense, getCurrentMonthExpense}= require("../controllers/expense")

router.post('/add', addExpense);
router.get('/current-month', getCurrentMonthExpense);
  
module.exports = router;
