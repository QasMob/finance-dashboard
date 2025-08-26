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

  const modal = type === "income" ? document.querySelector(".income") : document.querySelector(".expense");


  const titleInput = modal.querySelector("#modal__title");
  const amountInput = modal.querySelector("#modal__ammount");
  const categoryInput = modal.querySelector("select");
  const dateInput = modal.querySelector("#modal__date");


    const title = titleInput.value.trim();
    const ammount = parseFloat(amountInput.value);
    const selectedOption = categoryInput.selectedOptions[0]; 
    const optgroup = selectedOption.parentElement; 
    const mainCategory = optgroup.label || optgroup.getAttribute("label"); 
    const date = dateInput.value;


  if (!title || isNaN(ammount) || ammount <= 0 || !mainCategory || !date) {
    alert("Invalid input. Please fill in all fields correctly.");
    return null;
  }

    modal.style.display = "none";


    const idNum = idIterable.next().value;
    const obj = {
      id: idNum,
      title,
      category : mainCategory,
      ammount,
      date,
      type
    };

  return obj;
};


export default validation;