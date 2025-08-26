const doughnutChart = () => {
  const canvas = document.getElementById('myChart');
  if (!canvas) return; 
  const ctx = canvas.getContext('2d');

  if (window.myDoughnutChart) {
    window.myDoughnutChart.destroy();
  }

  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  const expenseTransactions = transactions.filter(obj => obj.type === 'expense');

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
};

export default doughnutChart;
