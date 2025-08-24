import validation from "./validation.js";
import pushData from "./data.js";
import cardLayout from "./cards.js";

const signInFeature = () => {
  const signInBtn = document.querySelector('.header__btn');
  const signupPage = document.querySelector('.signup__page');
  const main = document.querySelector('.main');
  const loginBtn = document.querySelector('.signup__page-btn');
  const name = document.querySelector('.header__name');

  const header = document.querySelector('.header');

  const income = document.querySelector('.header__incomebtn');
  const expense = document.querySelector('.header__expensebtn');

  const incomeModal = document.querySelector('.income');
  const expenseModal = document.querySelector('.expense');


  const incomeCard = document.querySelector('.cards__income-p');

  const cancelBtn = document.querySelector('.modal__btn-cancel');
  const cancelBtnExpense = document.querySelector('.modal__btn-cancel-expense');

  const mainBody = document.querySelector('.main__body');

  const addBtn = document.querySelector('.modal__btn-add');



  const signOutBtn = document.querySelector('.header__signoutbtn');

  let transactions = [];

  window.addEventListener('load', () => {
    const savedUsername = localStorage.getItem('username');

    if (savedUsername) {
      name.innerText = `👋 ${savedUsername}`;
      name.style.display = 'flex';
      signInBtn.style.display = 'none';
      main.style.display = 'block';
      signOutBtn.style.display = 'flex'
      income.style.display = 'flex';
      expense.style.display = 'flex';
       transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
       const incomeTotal = cardLayout();
       incomeCard.innerText = `$${incomeTotal}`;
       mainBody.style.display = 'flex';

    }
  });

  

  signInBtn.addEventListener('click', () => {

    signupPage.style.display = 'flex';

    header.style.display = 'none';    

    main.style.display = 'none';

  });


  loginBtn.addEventListener('click', () => {

    const username = document.querySelector('#username').value;

    signupPage.style.display = 'none';

    signInBtn.style.display = 'none';

    main.style.display = 'block';

    signOutBtn.style.display = 'flex'

    header.style.display = 'flex';  

    name.style.display = 'flex'

    name.innerText = `👋 ${username}`;

    const incomeTotal = cardLayout();
    incomeCard.innerText = `$${incomeTotal}`;
    mainBody.style.display = 'flex';


    income.style.display = 'flex';
    expense.style.display = 'flex';



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
    

    localStorage.removeItem('username');
  });



  income.addEventListener('click', () => {
    incomeModal.style.display = 'flex';
  });

  expense.addEventListener('click', () => {
    expenseModal.style.display = 'flex';
  });



  cancelBtn.addEventListener('click', () => {
    incomeModal.style.display = 'none';
  }
  );

  cancelBtnExpense.addEventListener('click', () => {
    expenseModal.style.display = 'none';
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


  addBtn.addEventListener('click', (e) => {
    let objData;
    if(e.target.classList.contains('expensebtn')){
      objData = validation('expense');
      

    } else if (e.target.classList.contains('incomesbtn')) {
      objData = validation('income');

     
  }

  if (objData){
    transactions = pushData(objData);
    const incomeTotal = cardLayout();
    incomeCard.innerText = `$${incomeTotal}`;
    mainBody.style.display = 'flex';
  }
  
})




}

export default signInFeature;