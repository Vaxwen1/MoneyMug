
// ----------------------------- REQUIRE -----------------------------
const Transaction = require('../models/transaction');

// ----------------------------- METHODS -----------------------------

// GET /api/transactions/recent
const transactionListByRecentDate = async (req, res) => {
  try {
    const transactions = await Transaction
      .find({})           
      .sort({ date: -1 }) 
      .limit(20)
      .lean();

    res.status(200).json(transactions);
  } catch (err) {
    console.error('Error retrieving transactions:', err);
    res.status(500).json({
      message: 'Error retrieving transactions',
      error: err
    });
  }
};

const transactionsCreate     = (req, res) => res.status(200).json({ status: 'success' });
const transactionsReadOne    = (req, res) => res.status(200).json({ status: 'success' });
const transactionsUpdateOne  = (req, res) => res.status(200).json({ status: 'success' });
const transactionsDeleteOne  = (req, res) => res.status(200).json({ status: 'success' });

// ----------------------------- EXPORTS -----------------------------
module.exports = {
  transactionListByRecentDate,
  transactionsCreate,
  transactionsReadOne,
  transactionsUpdateOne,
  transactionsDeleteOne
};
