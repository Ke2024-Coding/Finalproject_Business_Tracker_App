const express = require('express');
const router = express.Router();
const {addIncome, getCurrentMonthIncome} = require('../controllers/income')

router.post('/add', addIncome);
router.get('/current-month', getCurrentMonthIncome);
  

module.exports = router;
