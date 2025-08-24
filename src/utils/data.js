
const pushData = (data) => {
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  transactions.push(data);
  
  localStorage.setItem('transactions', JSON.stringify(transactions));

  return transactions;
}

export default pushData;