import tableGenerator from "./table.js";
import cardLayout from "./cards.js";
import addToExpense from "./expense.js";
import balanceDifference from "./balance.js";

const deleteDataTable = (id) => {
  
  
    let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

    

    transactions = transactions.filter(obj => obj.id !== id);
    
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    tableGenerator();

  const balanceCard = document.querySelector('.cards__balance-p');
  const balanceBorder = document.querySelector('.cards__balance');
  const incomeTotal = cardLayout();
  const expenseTotal = addToExpense();
  const balanceTotal = balanceDifference(incomeTotal, expenseTotal);

  if (balanceTotal < 0){
      balanceCard.classList.add('red');
      balanceBorder.classList.add('redBorder');
  } else if (balanceTotal > 0 || balanceTotal === 0){
      balanceCard.classList.remove('red');
      balanceBorder.classList.remove('redBorder');
  }

  document.querySelector('.cards__income-p').innerText = `$${incomeTotal}`;
  document.querySelector('.cards__expense-p').innerText = `$${expenseTotal}`;
  document.querySelector('.cards__balance-p').innerText = `$${balanceTotal}`;


};

export default deleteDataTable;