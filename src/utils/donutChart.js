const doughnutChart = () => {
  const canvas = document.getElementById('myChart');

  const barCanvas = document.getElementById('barChart');

  if (!canvas) return; 
  const ctx = canvas.getContext('2d');

  if (window.myDoughnutChart) {
    window.myDoughnutChart.destroy();
  }

  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  const expenseTransactions = transactions.filter(obj => obj.type === 'expense');

  const monthlyData = {};

  transactions.forEach(obj => {
    const month = new Date(obj.date).toLocaleString('default', {month: 'short', year: 'numeric'});

    if(!monthlyData[month]){
      monthlyData[month] = {income: 0, expense: 0};
    }


    if (obj.type === 'income'){
      monthlyData[month].income += obj.ammount;
    } else if (obj.type === 'expense'){
      monthlyData[month].expense += obj.ammount;
    }
  });

  const labelsTest = Object.keys(monthlyData);
  const incomeDataTest = labelsTest.map(label => monthlyData[label].income);
  const expenseDataTest = labelsTest.map(label => monthlyData[label].expense);






  const labelObj = {
    'Housing': 0,
    'Transportation': 0,
    'Food & Drinks': 0,
    'Entertainment': 0,
    'Health': 0,
    'gaming': 0,
    'Education': 0,
    'Shopping': 0,
    'Travel': 0,
    'Other Expenses': 0
  };

  expenseTransactions.forEach(obj => {
    if (labelObj.hasOwnProperty(obj.category)) {
      labelObj[obj.category] += obj.ammount;
    }
  });

  const labelArray = Object.keys(labelObj);
  const ammountArray = Object.values(labelObj);


  // Only create chart if canvas is visible
  if (canvas.offsetParent !== null) {
    window.myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labelArray,
        datasets: [{
          label: 'Expenses',
          data: ammountArray,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title : {
          display : true,
          text: 'Expenses Chart',
          color : 'black',
          font : {
            size: 20,
            weight: 'bold',
          }
        }
        }
      }
    });
  }

if (barCanvas && barCanvas.offsetParent !== null) {
  const barCtx = barCanvas.getContext('2d');


  if (window.myBarChart) {
    window.myBarChart.destroy();
  }

  window.myBarChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: labelsTest,
      datasets: [
        {
          label: 'Income',
          data: incomeDataTest,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Expenses',
          data: expenseDataTest,
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: 'Monthly Income vs Expenses',
          color: 'black',
          font: {
            size: 20,
            weight: 'bold'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

};

export default doughnutChart;
