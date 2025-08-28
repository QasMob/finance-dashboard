import deleteDataTable from "./delete.js";
import updateDataTable from "./update.js";


const renderTable = (transactionsArray) => {
  const table = document.querySelector('.tableBody');
  table.innerHTML = ""; // clear old rows

  transactionsArray.forEach(obj => {
    const row = document.createElement('tr');
    row.dataset.id = obj.id;

    const informationTitle = document.createElement('td');
    const informationCategory = document.createElement('td');
    const informationType = document.createElement('td');
    const informationAmount = document.createElement('td');
    const informationDate = document.createElement('td');
    const informationAction = document.createElement('td');
    const btnDiv = document.createElement('div');
    btnDiv.classList.add('btnDiv');

    informationTitle.innerText = obj.title;
    informationCategory.innerText = obj.category;
    informationAmount.innerText = `$${obj.ammount}`;
    informationType.innerText = obj.type;
    informationDate.innerText = obj.date;

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "modal__btn-edit");
    editBtn.innerText = "Edit";

    const deleteBtns = document.createElement("button");
    deleteBtns.classList.add("btn", "modal__btn-delete");
    deleteBtns.innerText = "Delete";

    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(deleteBtns);
    informationAction.appendChild(btnDiv);

    row.append(informationTitle, informationType, informationCategory, informationAmount, informationDate, informationAction);
    table.appendChild(row);

    deleteBtns.addEventListener('click', () => deleteDataTable(obj.id));
    editBtn.addEventListener('click', () => updateDataTable(obj.id));
  });
};




const tableGenerator = () => {

  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    
  const table = document.querySelector('.tableBody');

  table.innerHTML = "";


  const searchInput = document.querySelector('#search');


  searchInput.addEventListener('input', (e) => {
    const query = searchInput.value.toLowerCase();

    const filtered = transactions.filter(t =>
      t.title.toLowerCase().includes(query) 
    )

   renderTable(filtered); 
  })
  
  transactions.forEach(obj => {
    const row = document.createElement('tr');
    row.dataset.id = obj.id;
    const informationTitle = document.createElement('td');
    const informationCategory = document.createElement('td');
    const informationType = document.createElement('td');
    const informationAmount = document.createElement('td');
    const informationDate = document.createElement('td');
    const informationAction = document.createElement('td');
    const informationEdit = document.createElement('td');
    const btnDiv = document.createElement('div');
    btnDiv.classList.add('btnDiv');
    informationTitle.innerText = obj.title;
    informationCategory.innerText = obj.category;
    informationAmount.innerText = `$${obj.ammount}`;
    informationType.innerText = obj.type;
    informationDate.innerText = obj.date;
   
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "modal__btn-edit");
    editBtn.innerText = "Edit";


    const deleteBtns = document.createElement("button");
    deleteBtns.classList.add("btn", "modal__btn-delete");
    deleteBtns.innerText = "Delete";

    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(deleteBtns);


    informationAction.appendChild(btnDiv);


    row.append(informationTitle, informationType, informationCategory, informationAmount, informationDate, informationAction)
    table.appendChild(row);

  });

  const deleteBtn = document.querySelectorAll('.modal__btn-delete');
  deleteBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(e.target.closest('tr').dataset.id);
      deleteDataTable(id);
    });
  });




 table.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (!row) return;
    const id = Number(row.dataset.id);

    if (e.target.classList.contains("modal__btn-edit")) {
      updateDataTable(id);
    }
  });


};

export default tableGenerator;