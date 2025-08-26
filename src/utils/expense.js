const addToExpense = () => {
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');


  const totalExpense = transactions.filter(obj => obj.type === 'expense').reduce((sum, obj) => sum + obj.ammount, 0);

  return totalExpense;
  


};

export default addToExpense;