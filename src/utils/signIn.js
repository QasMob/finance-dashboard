
const signInFeature = () => {
  const signInBtn = document.querySelector('.header__btn');
  const signupPage = document.querySelector('.signup__page');
  const main = document.querySelector('.main');
  const loginBtn = document.querySelector('.signup__page-btn');
  const name = document.querySelector('.header__name');

  const income = document.querySelector('.header__incomebtn');
  const expense = document.querySelector('.header__expensebtn');

  const signOutBtn = document.querySelector('.header__signoutbtn');


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

    }
  });

  

  signInBtn.addEventListener('click', () => {

    signupPage.style.display = 'flex';

    main.style.display = 'none';

  });


  loginBtn.addEventListener('click', () => {

    const username = document.querySelector('#username').value;

    signupPage.style.display = 'none';

    signInBtn.style.display = 'none';

    main.style.display = 'block';

    signOutBtn.style.display = 'flex'

    name.style.display = 'flex'

    name.innerText = `👋 ${username}`;


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

    localStorage.removeItem('username');
  });






}

export default signInFeature;