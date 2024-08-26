const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  addNewCategory,
  updateCategory,
  deleteCategory
} =require("../controllers/category")

router.get('/', getAllCategories);

router.post('/add', addNewCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;
