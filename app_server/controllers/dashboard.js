/* GET 'Home' / Dashboard page */
const home = function(req, res) {
  res.render('dashboard', {
    title: 'Budget Tracker Dashboard',
    pageHeader: {
      title: 'Your Budget Dashboard',
      strapline: 'Track your income, expenses, and goals.'
    },
    summary: {
      totalIncome: 5000,
      totalExpenses: 3200,
      balance: 1800
    },
    recentTransactions: [
      { description: 'Groceries', amount: -150, date: '2025-10-20', category: 'Food' },
      { description: 'Salary', amount: 2500, date: '2025-10-15', category: 'Income' },
      { description: 'Electric Bill', amount: -75, date: '2025-10-10', category: 'Utilities' }
    ]
  });
};

module.exports = {
  home
};
