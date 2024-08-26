import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const AddIncomePage = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/category');
        setCategories(response.data);
      } catch (error) {
        setMessage(error?.response?.data?.message || 'Error fetching categories: ' + error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/income/add', {
        amount,
        date,
        category,
      });

      if (response.status === 201) {
        setMessage('Income added successfully');
        setAmount('');
        setDate('');
        setCategory('');
      } else {
        setMessage('Error: ' + response.data.message);
      }
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Error: ' + error.response?.data?.message || error.message);
    }
  };

  const handleCancel = () => {
    setAmount('');
    setDate('');
    setCategory('');
  };


  return (
  <>
    <Navbar />
    <div className="income-container">
      <div className="form-container">
        <h2>Add Income</h2>
        <form onSubmit={handleSave}>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AddIncomePage;
