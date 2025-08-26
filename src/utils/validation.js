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
    const category = categoryInput.value;
    const date = dateInput.value;


  if (!title || isNaN(ammount) || ammount <= 0 || !category || !date) {
    alert("Invalid input. Please fill in all fields correctly.");
    return null;
  }

    modal.style.display = "none";


    const idNum = idIterable.next().value;
    const obj = {
      id: idNum,
      title,
      category,
      ammount,
      date,
      type
    };

  return obj;
};


export default validation;