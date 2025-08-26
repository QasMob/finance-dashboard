const addToIncome = () => {
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');


  const totalIncome = transactions.filter(obj => obj.type === 'income').reduce((sum, obj) => sum + obj.ammount, 0);

  return totalIncome;
  


};

export default addToIncome;