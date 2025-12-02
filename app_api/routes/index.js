const express = require('express');
const router = express.Router();


const ctrlUsers = require('../controllers/users');
const ctrlCategories = require('../controllers/categories');
const ctrlTransactions = require('../controllers/transactions');

// ---------------- Users ----------------

router.post('/users', ctrlUsers.userCreate);

router.post('/login', ctrlUsers.userLogin);

// ---------------- Categories ----------------

router.get('/categories', ctrlCategories.categoriesList);

// ---------------- Transactions ----------------


router.get(
  '/transactions/recent',
  ctrlTransactions.recentTransactions
);

// ---------------- EXPORT ----------------
module.exports = router;
