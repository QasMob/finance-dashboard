import deleteDataTable from "./delete.js";

const tableGenerator = () => {

  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    
  const table = document.querySelector('.tableBody');

  table.innerHTML = "";
  
  transactions.forEach(obj => {
    const row = document.createElement('tr');
    row.dataset.id = obj.id;
    const informationTitle = document.createElement('td');
    const informationCategory = document.createElement('td');
    const informationType = document.createElement('td');
    const informationAmount = document.createElement('td');
    const informationDate = document.createElement('td');
    const informationAction = document.createElement('td');
    informationTitle.innerText = obj.title;
    informationCategory.innerText = obj.category;
    informationAmount.innerText = `$${obj.ammount}`;
    informationType.innerText = obj.type;
    informationDate.innerText = obj.date;
    informationAction.innerHTML = '<button class="btn  modal__btn-delete">Delete</button>';
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






};

export default tableGenerator;