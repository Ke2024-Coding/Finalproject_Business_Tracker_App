const Category = require('../models/Category');

const getAllCategories=async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch categories', error });
    }
  }

const addNewCategory=async (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Name is required.' });
    }
  
    try {
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category already exists' });
      }
  
      const newCategory = new Category({ name });
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: 'Error adding category', error });
    }
  }

  const updateCategory= async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {
      const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update category', error });
    }
  }

  const deleteCategory=async (req, res) => {
    const { id } = req.params;
  
    try {
      await Category.findByIdAndDelete(id);
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete category', error });
    }
  }

  module.exports= {
    getAllCategories,
    addNewCategory,
    updateCategory,
    deleteCategory
  }