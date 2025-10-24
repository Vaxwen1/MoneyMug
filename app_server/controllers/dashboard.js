const mongoose = require('mongoose');
require('../models/category');
const Category = mongoose.model('Category');

const home = async (req, res) => {
  try {
    // Fetch all categories from MongoDB
    const categories = await Category.find({}).lean();

    res.render('dashboard', {
      title: 'Budget Tracker Dashboard',
      pageHeader: {
        title: 'Your Budget Dashboard',
        strapline: 'Track your income, expenses, and goals.'
      },
      summary: {
        balance: 1800
      },
      categories: [
        {
          id:1,
          categoryName: "Groceries",
          categoryColor: "#764c9aff"
        },
        {
          id:2,
          categoryName: "Utilities",
          categoryColor: "#009688"
        },
        {
          id:3,
          categoryName: "Transport",
          categoryColor: "#FF9800"
        },
        {
          id:4,
          categoryName: "Restaurant",
          categoryColor: "#E91E63"
        }
      ],
      recentTransactions: [
        { description: 'Dunnes Store', amount: -150, date: '2025-10-20', categoryId: 1 },
        { description: "Mcdonald's", amount: -20, date: '2025-10-15', categoryId: 4 },
        { description: 'Electric Bill', amount: -75, date: '2025-10-10', categoryId: 2 }
      ]
    });
  } catch (err) {
    console.error('Error loading dashboard:', err);
    res.status(500).send('Error loading dashboard');
  }
};

module.exports = { home };
