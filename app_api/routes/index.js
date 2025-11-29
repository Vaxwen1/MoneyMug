const express = require('express');
const router = express.Router();

const ctrlCategories = require('../controllers/categories');
const ctrlTransactions = require('../controllers/transactions');
const ctrlUsers = require('../controllers/users');

// Categories
router
  .route('/categories')
  .get(ctrlCategories.categoryReadAll)
  .post(ctrlCategories.categoryCreate);

// Transactions
router
  .route('/transactions/recent')
  .get(ctrlTransactions.transactionListByRecentDate);

// Users - registration
router
  .route('/users')
  .post(ctrlUsers.userCreate);

// Users - login
router
  .route('/login')
  .post(ctrlUsers.userLogin);

module.exports = router;
