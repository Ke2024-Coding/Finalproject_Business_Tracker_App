import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ManageCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editCategory, setEditCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/category');
      setCategories(response.data);
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Error fetching categories: ' + error.message);
    }
  };

  const handleAddCategory = async () => {
    
    try {
      if(newCategory.length==0){
        setMessage('Name is required.')
        return
      }
      await api.post('/category/add', { name: newCategory });
      setNewCategory('');
      fetchCategories();
      setMessage('Category added successfully');
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Error adding category: ' + error.message);
    }
  };

  const handleEditCategory = async () => {
    try {
      if(editName.length==0){
        setMessage('Name is required.')
        return
      }
      await api.put(`/category/${editCategory._id}`, { name: editName });
      setEditCategory(null);
      setEditName('');
      fetchCategories();
      setMessage('Category updated successfully');
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Error updating category: ' + error.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await api.delete(`/category/${id}`);
      fetchCategories();
      setMessage('Category deleted successfully');
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Error deleting category: ' + error.message);
    }
  };

  return (
  <>
    <Navbar />
    <div className="categories-container">
      <div className="form-container">
        <h2>Manage Categories</h2>
        <div className="category-list">
        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          <ul>
            {categories.map(category => (
              <li key={category._id}>
                {editCategory && editCategory._id === category._id ? (
                  <div>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                    />
                    <button onClick={handleEditCategory}>Save</button>
                    <button onClick={() => setEditCategory(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    {category.name}
                    <button onClick={() => {
                      setEditCategory(category);
                      setEditName(category.name);
                    }}>Edit</button>
                    <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        </div>
        <div className="add-category">
          <h3>Add New Category</h3>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            required
          />
          <button onClick={handleAddCategory}>Add</button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
    <Footer/>
  </>
  );
};

export default ManageCategoriesPage;
