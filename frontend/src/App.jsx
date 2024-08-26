import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddIncomePage from './pages/AddIncomePage';
import AddExpensesPage from './pages/AddExpensesPage';
import ManageCategoriesPage from './pages/ManageCategoriesPage';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-income" element={<AddIncomePage />} />
        <Route path="/add-expenses" element={<AddExpensesPage />} />
        <Route path="/manage-categories" element={<ManageCategoriesPage />} />

      </Routes>
    </Router>
  );
}

export default App;
