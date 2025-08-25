const tableGenerator = () => {

  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    
  const table = document.querySelector('.tableBody');
  
  transactions.forEach(obj => {
    const row = document.createElement('tr');
    const informationTitle = document.createElement('td');
    const informationCategory = document.createElement('td');
    const informationAmount = document.createElement('td');
    const informationDate = document.createElement('td');
    const informationAction = document.createElement('td');
    informationTitle.innerText = obj.title;
    informationCategory.innerText = obj.category;
    informationAmount.innerText = obj.ammount;
    informationDate.innerText = obj.date;
    row.append(informationTitle, informationCategory, informationAmount, informationDate, informationAction)
    table.appendChild(row);

  });





};

export default tableGenerator;