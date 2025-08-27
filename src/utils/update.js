import tableGenerator from "./table.js";
import cardLayout from "./cards.js";
import addToExpense from "./expense.js";
import balanceDifference from "./balance.js";
import doughnutChart from "./donutChart.js";

const updateDataTable = (id) => {
  let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  const obj = transactions.find(t => t.id === id);
  if (!obj) return;

  const editModal = document.querySelector('.income-edit');
  const transactionSection = document.querySelector('.transactionTable');
  const donutChart = document.querySelector('.chart');
  const mainBody = document.querySelector('.main__body');

  const editModalTitle = document.querySelector('#edit-income-title');
  const editModalAmount = document.querySelector('#edit-income-amount');
  const editDate = document.querySelector("#edit-income-date");
  const editSubCategory = document.querySelector("#edit-income-subcategory");

  const cancelBtn = document.querySelector('.modal__btn-cancel-edit-income');
  const saveBtn = document.querySelector('.modal__btn-save-edit-income');

  editModalTitle.value = obj.title;
  editModalAmount.value = obj.ammount;
  editDate.value = obj.date;
  if (editSubCategory) editSubCategory.value = obj.subcategory || "";


  editModal.style.display = 'flex';
  mainBody.style.display = 'none';
  donutChart.style.display = 'none';
  transactionSection.style.display = 'none';

  cancelBtn.onclick = () => {
    editModal.style.display = 'none';
    mainBody.style.display = 'flex';
    donutChart.style.display = 'block';
    transactionSection.style.display = 'block';
  };


  saveBtn.onclick = () => {
    obj.title = editModalTitle.value;
    obj.ammount = parseFloat(editModalAmount.value);
    obj.date = editDate.value;
    if (editSubCategory) obj.subcategory = editSubCategory.value;

    localStorage.setItem('transactions', JSON.stringify(transactions));

    const incomeTotal = cardLayout();
    const expenseTotal = addToExpense();
    tableGenerator();
    doughnutChart();

    const balanceTotal = balanceDifference(incomeTotal, expenseTotal);
    const balanceCard = document.querySelector('.cards__balance-p');
    const balanceBorder = document.querySelector('.cards__balance');
    const incomeCard = document.querySelector('.cards__income-p');
    const expenseCard = document.querySelector('.cards__expense-p');

    if (balanceTotal < 0){
      balanceCard.classList.add('red');
      balanceBorder.classList.add('redBorder');
    } else {
      balanceCard.classList.remove('red');
      balanceBorder.classList.remove('redBorder');
    }

    incomeCard.innerText = `$${incomeTotal}`;
    expenseCard.innerText = `$${expenseTotal}`;
    balanceCard.innerText = `$${balanceTotal}`;

    editModal.style.display = 'none';
    mainBody.style.display = 'flex';
    donutChart.style.display = 'block';
    transactionSection.style.display = 'block';
  };


};

export default updateDataTable;
