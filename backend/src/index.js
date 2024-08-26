const dotenv = require('dotenv');

dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const incomeRoutes = require('./routes/income');
const expenseRoutes = require('./routes/expense');
const categoryRoutes = require('./routes/category');

const budgetRoutes = require('./routes/budget');


const app = express();

app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/category', categoryRoutes);
app.use("/api/budget", budgetRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
