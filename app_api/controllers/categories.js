const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Budget = mongoose.model('Budget');

const categoriesList = async (req, res) => {
  try {
    const firstBudget = await Budget.findOne().sort({ _id: 1 }).exec();

    if (!firstBudget) {
      return res.status(404).json({ message: 'No budgets found in database' });
    }

    const categories = await Category.find({ budgetId: firstBudget._id }).exec();

    return res.status(200).json(categories);
  } catch (err) {
    console.error('Error getting categories by first budget:', err);
    return res.status(500).json({
      message: 'Error getting categories',
      error: err
    });
  }
};

module.exports = {
  categoriesList
};
