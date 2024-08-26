import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';
import Navbar from '../components/Navbar';
import { Bar, Pie } from 'react-chartjs-2';
import Footer from '../components/Footer';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const HomePage = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const fetchOverviewData = async () => {
    try {
      const incomeResponse = await api.get('/income/current-month');
      setIncome(incomeResponse.data.total);

      const expensesResponse = await api.get('/expense/current-month');
      setExpenses(expensesResponse.data);

      const budgetResponse = await api.get('/budget/current');
      setRemainingBudget(budgetResponse.data.remainingBudget);

    } catch (error) {
      setMessage(error?.response?.data?.message || 'Error fetching overview data: ' + error.message);
    }
  };

  
  const getCategoryExpenseData = () => {
    const categoryTotals = {};

    expenses.forEach(expense => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });

    return {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      }],
    };
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
  <>
    <Navbar />
    <div className="home-container">
      <div className="main-content">
        <h2>Dashboard</h2>
        <div className="overview">
          <div className="overview-item">
            <h3>Current Monthly Income</h3>
            <p>${income.toFixed(2)}</p>
          </div>
          <div className="overview-item">
            <h3>Total Expenses</h3>
            <p>${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="overview-item">
            <h3>Remaining Budget</h3>
            <p>${remainingBudget.toFixed(2)}</p>
          </div>
        </div>
        <div className="charts">
          <div className="chart">
            <h3>Expenses by Category</h3>
            {expenses && expenses.length>0?
            <Pie data={getCategoryExpenseData()} width={400} height={400} />: <p>No Expenses Yet!</p>}
          </div>
        </div>
      </div>

    </div>
    <Footer/>
  </>

  );
};

export default HomePage;
