const express = require('express');
const router = express.Router();
const {getCurrentRemainingBudget} =require("../controllers/budget")

router.get('/current', getCurrentRemainingBudget);

module.exports = router;
