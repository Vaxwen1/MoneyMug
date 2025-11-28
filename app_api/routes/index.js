// ----------------------------- REQUIRE -----------------------------

const express = require('express');
const router = express.Router();

const ctrlCategories = require('../controllers/categories');
const ctrlTransactions = require('../controllers/transactions');
//const ctrlUser = require('../controllers/user');

// ----------------------------- ROUTES -----------------------------

// Categories
router
  .route('/categories')
  .get(ctrlCategories.categoryReadAll)
  .post(ctrlCategories.categoryCreate);
  
  
// Transactions
router
  .route('/transactions/recent')
  .get(ctrlTransactions.transactionListByRecentDate);


module.exports = router;
