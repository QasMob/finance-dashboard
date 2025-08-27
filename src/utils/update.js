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
  const editExpense = document.querySelector('.edit-expense');
  const transactionSection = document.querySelector('.transactionTable');
  const donutChart = document.querySelector('.chart');
  const mainBody = document.querySelector('.main__body');

  const editExpenseTitle = document.querySelector('#edit__title');
  const editModalTitle = document.querySelector('#edit-income-title');

  const editExpenseAmount = document.querySelector('#edit__amount');
  const editModalAmount = document.querySelector('#edit-income-amount');

  const editExpenseDate = document.querySelector('#edit__date');
  const editDate = document.querySelector("#edit-income-date");

  const editExpenseCategory = document.querySelector('#edit__category');
  const editSubCategory = document.querySelector("#edit-income-subcategory");


  const cancelExpenseBtn = document.querySelector('.modal__btn-cancel-edit-expense')
  const cancelBtn = document.querySelector('.modal__btn-cancel-edit-income');

  const saveExpenseBtn = document.querySelector('.modal__btn-save-edit-expense');
  const saveBtn = document.querySelector('.modal__btn-save-edit-income');

 if (obj.type === 'income'){
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

    doughnutChart();
  };
 } else if (obj.type === 'expense'){
  editExpenseTitle.value = obj.title;
  editExpenseAmount.value = obj.ammount;
  editExpenseDate.value = obj.date;
  if (editExpenseCategory) editExpenseCategory.value = obj.subcategory || "";


  editExpense.style.display = 'flex';
  mainBody.style.display = 'none';
  donutChart.style.display = 'none';
  transactionSection.style.display = 'none';

  cancelExpenseBtn.onclick = () => {
    editExpense.style.display = 'none';
    mainBody.style.display = 'flex';
    donutChart.style.display = 'block';
    transactionSection.style.display = 'block';
  };


  saveExpenseBtn.onclick = () => {
    obj.title = editExpenseTitle.value;
    obj.ammount = parseFloat(editExpenseAmount.value);
    obj.date = editExpenseDate.value;
    if (editExpenseCategory) obj.subcategory = editExpenseCategory.value;

    localStorage.setItem('transactions', JSON.stringify(transactions));

    const incomeTotal = cardLayout();
    const expenseTotal = addToExpense();
    tableGenerator();

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

    editExpense.style.display = 'none';
    mainBody.style.display = 'flex';
    donutChart.style.display = 'block';
    transactionSection.style.display = 'block';

    doughnutChart();
 }
 }

};

export default updateDataTable;
