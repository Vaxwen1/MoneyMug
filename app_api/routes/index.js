const express = require('express');
const router = express.Router();
//const ctrlDashboard = require('../controllers/dashboard');
const ctrlCategories = require('../controllers/categories');
const ctrlTransactions = require('../controllers/transactions');
//const ctrlUser = require('../controllers/user');

// Dashboard
// router
//   .route('/dashboard')
//   .get(ctrlDashboard.dashboard);

// Categories
router
  .route('/categories')
  .get(ctrlCategories.categoryReadAll)
  .post(ctrlCategories.categoryCreate);
  
  
// router
//   .route('//:transactionid')
//   .get(ctrlTransactions.locationsReadOne)
//   .put(ctrlTransactions.locationsUpdateOne)
//   .delete(ctrlTransactions.locationsDeleteOne);
  
// User
// router
//   .route('/locations/:locationid/reviews')
//   .post(ctrlReviews.reviewsCreate);

// router
//   .route('/locations/:locationid/reviews/:reviewid')
//   .get(ctrlReviews.reviewsReadOne)
//   .put(ctrlReviews.reviewsUpdateOne)
//   .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;
