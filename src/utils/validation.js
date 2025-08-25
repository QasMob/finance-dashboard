import signInFeature from "./signIn.js";

function* generatorId(){

  let id = 1;

  while(true){
    yield id;
    id++;
  }

}

const idIterable = generatorId();


const validation = (type) => {

  const incomeModal = document.querySelector('.income');
 
  const expenseModal = document.querySelector('.expense');

  const modalTitle = document.getElementById('modal__title').value.trim();

  const modalAmmount = parseFloat(document.getElementById('modal__ammount').value.trim());

   
  const modalCatagory = document.getElementById('modal__catagory').value;
   
  const modalDate = document.getElementById('modal__date').value;

  let isValid = false;

  if (modalTitle !== '' && modalAmmount > 0 && !isNaN(modalAmmount) && modalDate){
    isValid = true;
  }


  if (isValid){
     incomeModal.style.display = 'none';
     const idNum = idIterable.next().value;

      const incomeObj = {
        id: idNum,
        title: modalTitle,
        category: modalCatagory,
        ammount: modalAmmount,
        date: modalDate,
        type: type

      };

      return incomeObj;
  }

  alert('invalid, please enter all fields');
  

};

export default validation;