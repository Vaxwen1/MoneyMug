// ----------------------------- REQUIRE -----------------------------
require('../../app_api/models/category');
require('../../app_api/models/transaction');

// ----------------------------- Request -----------------------------

const request = require('request');

const apiOptions = { 
  server: 'http://localhost:3000' 
}; 

if (process.env.NODE_ENV === 'production') { 
  apiOptions.server = 'https://moneymug.onrender.com'; 
}

// ----------------------------- Methods -----------------------------

const home = function (req, res) {
  const pathCategory    = '/api/categories';
  const pathTransaction = '/api/transactions/recent';

  const categoriesOptions = {
    url: apiOptions.server + pathCategory,
    method: 'GET',
    json: {},   
  };

  const transactionsOptions = {
    url: apiOptions.server + pathTransaction,
    method: 'GET',
    json: {},   
  };

  // Get categories
  request(categoriesOptions, (err, response, categories) => {
    if (err || !response || response.statusCode !== 200) {
      console.error('Error getting categories:', err || response && response.statusCode);
      return res.status(500).send('Error loading dashboard');
    }

    // Get recent transactions
    request(transactionsOptions, (err2, response2, transactions) => {
      if (err2 || !response2 || response2.statusCode !== 200) {
        console.error('Error getting transactions:', err2 || response2 && response2.statusCode);
        return res.status(500).send('Error loading dashboard');
      }

      // Render page with BOTH
      _renderHomepage(req, res, categories, transactions);
    });
  });
};

// ----------------------------- Private Methods -----------------------------

const _renderHomepage = function (req, res, apiCategoryData, apiTransactionData) {
  res.render('dashboard', {
    title: 'Budget Tracker Dashboard',
    pageHeader: {
      title: 'Your Budget Dashboard',
      strapline: 'Track your income, expenses, and goals.'
    },
    summary: {
      balance: 1800
    },
    categories: apiCategoryData || [],
    recentTransactions: apiTransactionData || []
  });
};

// ----------------------------- EXPORTS -----------------------------
module.exports = { home };
