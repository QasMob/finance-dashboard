import validation from "./validation.js";
import pushData from "./data.js";
import cardLayout from "./cards.js";
import tableGenerator from "./table.js";
import addToExpense from './expense.js';
import balanceDifference from './balance.js';
import doughnutChart from "./donutChart.js";


function runAnimations(){
  
const timeline = gsap.timeline({defaults: {duration: 1}});

timeline
.from('.header', {y:'-100', ease: 'power1.out'})
.from('.cards__container', {x : '-100vw', ease: 'power1.out'}, {delay: 3})
.from('.chart', {y : '-100vh', ease: 'power1.out'}, {delay : 3})
.from('.news__container', {y : '100vh', ease : 'power1.out'}, {delay: 3})
.from('.transactionTable', {y : '100vw', ease: 'power1.out'}, {delay: 3})
}  

const signInFeature = () => {



  const signInBtn = document.querySelector('.header__btn');
  const signupPage = document.querySelector('.signup__page');
  const main = document.querySelector('.main');
  const loginBtn = document.querySelector('.signup__page-btn');
  const name = document.querySelector('.header__name');

  const balanceBorder = document.querySelector('.cards__balance');

  const transactionSection = document.querySelector('.transactionTable');

  const header = document.querySelector('.header');

  const donutChart = document.querySelector('.chart');

  const income = document.querySelector('.header__incomebtn');
  const expense = document.querySelector('.header__expensebtn');

  const incomeModal = document.querySelector('.income');
  const expenseModal = document.querySelector('.expense');
  const signOutBtn = document.querySelector('.header__signoutbtn');


  const incomeCard = document.querySelector('.cards__income-p');
  const expenseCard = document.querySelector('.cards__expense-p');
  const balanceCard = document.querySelector('.cards__balance-p');

  const cancelBtn = document.querySelector('.modal__btn-cancel');
  const cancelBtnExpense = document.querySelector('.modal__btn-cancel-expense');

  const mainBody = document.querySelector('.main__body');

  const addBtn = document.querySelectorAll('.modal__btn-add');




  let transactions = [];

  window.addEventListener('load', () => {
    const savedUsername = localStorage.getItem('username');

    if (savedUsername) {
      name.innerText = `Welcome ${savedUsername}`;
      name.style.display = 'flex';
      signInBtn.style.display = 'none';
      main.style.display = 'block';
      signOutBtn.style.display = 'flex'
      income.style.display = 'flex';
      expense.style.display = 'flex';
       transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
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
       balanceCard.innerText = `$${balanceTotal}`;
       incomeCard.innerText = `$${incomeTotal}`;
       expenseCard.innerText = `$${expenseTotal}`;
       mainBody.style.display = 'flex';
       donutChart.style.display = 'block';
       transactionSection.style.display = 'block';
       tableGenerator();
        setTimeout(() => doughnutChart(), 0);
        
        runAnimations();
    }

  });

  

  signInBtn.addEventListener('click', () => {

    signupPage.style.display = 'flex';

    header.style.display = 'none';    

    main.style.display = 'none';

  });


  loginBtn.addEventListener('click', () => {
    

    const username = document.querySelector('#username').value;

    if(username === ''){
      alert('Please enter in a username');
      return;
    }

    signupPage.style.display = 'none';

    signInBtn.style.display = 'none';

    main.style.display = 'block';

    signOutBtn.style.display = 'flex'

    header.style.display = 'flex';  

    name.style.display = 'flex'

    name.innerText = `Welcome ${username}`;

    const incomeTotal = cardLayout();
    const expenseTotal = addToExpense();
    donutChart.style.display = 'block';
    tableGenerator();
    setTimeout(() => doughnutChart(), 0);
    incomeCard.innerText = `$${incomeTotal}`;
    expenseCard.innerText = `$${expenseTotal}`
    const balanceTotal = balanceDifference(incomeTotal, expenseTotal);
    if (balanceTotal < 0){
      balanceCard.classList.add('red');
      balanceBorder.classList.add('redBorder');
    } else if (balanceTotal > 0 || balanceTotal === 0){
      balanceCard.classList.remove('red');
      balanceBorder.classList.remove('redBorder');
    }
    balanceCard.innerText = `$${balanceTotal}`;
    mainBody.style.display = 'flex';
    transactionSection.style.display = 'block';


    income.style.display = 'flex';
    expense.style.display = 'flex';

   runAnimations();

    localStorage.setItem('username', username);
  })


  signOutBtn.addEventListener('click', () => {
    name.innerText = '';
    name.style.display = 'none';

    signInBtn.style.display = 'flex';
    signOutBtn.style.display = 'none';

    income.style.display = 'none';
    expense.style.display = 'none';

    mainBody.style.display = 'none';
       donutChart.style.display = 'none';
    transactionSection.style.display = 'none';
    

    localStorage.removeItem('username');
  });



  income.addEventListener('click', () => {
    incomeModal.style.display = 'flex';
    mainBody.style.display = 'none';
     donutChart.style.display = 'none';
    transactionSection.style.display = 'none';
  });

 

  expense.addEventListener('click', () => {
    expenseModal.style.display = 'flex';
    mainBody.style.display = 'none';
           donutChart.style.display = 'none';
    transactionSection.style.display = 'none';
  });



  cancelBtn.addEventListener('click', () => {
    incomeModal.style.display = 'none';
    mainBody.style.display = 'flex';
           donutChart.style.display = 'block';
    transactionSection.style.display = 'block';
  }
  );

  cancelBtnExpense.addEventListener('click', () => {
    expenseModal.style.display = 'none';
    mainBody.style.display = 'flex';
         donutChart.style.display = 'block';
    transactionSection.style.display = 'block';
  }
  );


  window.addEventListener('click', (e) => {

    if(incomeModal.style.display === 'flex' && !incomeModal.contains(e.target) && e.target !== income){
      incomeModal.style.display = 'none';
    }

    if (expenseModal.style.display === 'flex' && !expenseModal.contains(e.target) && e.target !== expense) {
      expenseModal.style.display = 'none';
    }

  });

  addBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
    let objData;
    if(e.target.classList.contains('expensebtn')){
      objData = validation('expense');
      

    } else if (e.target.classList.contains('incomesbtn')) {
      objData = validation('income');

     
  }

    if (objData){
      transactions = pushData(objData);
      const incomeTotal = cardLayout();
      const expenseTotal = addToExpense();
      donutChart.style.display = 'block';
      tableGenerator();
      setTimeout(() => doughnutChart(), 0);
      incomeCard.innerText = `$${incomeTotal}`;
      expenseCard.innerText = `$${expenseTotal}`
      const balanceTotal = balanceDifference(incomeTotal, expenseTotal);
    if (balanceTotal < 0){
      balanceCard.classList.add('red');
      balanceBorder.classList.add('redBorder');
    } else if (balanceTotal > 0 || balanceTotal === 0){
      balanceCard.classList.remove('red');
      balanceBorder.classList.remove('redBorder');
    }
      balanceCard.innerText = `$${balanceTotal}`;
      mainBody.style.display = 'flex';
      transactionSection.style.display = 'block';
    }
    
  
    })
  });
  





}

export default signInFeature;