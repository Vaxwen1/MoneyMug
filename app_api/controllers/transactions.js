// app_api/controllers/transaction.js
const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');
const Category = mongoose.model('Category');
const Budget = mongoose.model('Budget');

const recentTransactions = async (req, res) => {
  try {
    const firstBudget = await Budget.findOne().sort({ _id: 1 }).exec();
    if (!firstBudget) {
      return res.status(404).json({ message: 'No budgets found in database' });
    }

    const categories = await Category.find({ budgetId: firstBudget._id }).select('_id').exec();
    const categoryIds = categories.map(c => c._id);

    const transactions = await Transaction.find({ categoryId: { $in: categoryIds } })
      .sort({ date: -1 })
      .limit(10)
      .exec();

    return res.status(200).json(transactions);
  } catch (err) {
    console.error('Error getting recent transactions by first budget:', err);
    return res.status(500).json({
      message: 'Error getting transactions',
      error: err
    });
  }
};

module.exports = {
  recentTransactions
};
