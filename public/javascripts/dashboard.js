document.addEventListener('DOMContentLoaded', () => {
  const categoryItems = document.querySelectorAll('.category-list li.item');
  const transactions = document.querySelectorAll('#transaction-list li.item');

  categoryItems.forEach(category => {
    category.addEventListener('click', () => {
      // Remove "active" class from all
      categoryItems.forEach(c => c.classList.remove('active'));
      category.classList.add('active');

      const selectedId = category.dataset.id;

      // Filter transactions
      transactions.forEach(tx => {
        if (tx.dataset.categoryId === selectedId) {
          tx.style.display = 'flex';
        } else {
          tx.style.display = 'none';
        }
      });
    });
  });
});
