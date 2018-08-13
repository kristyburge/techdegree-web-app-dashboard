// =====================================
// Chart settings using Chart.js library
// =====================================
Chart.defaults.global.defaultFontColor = '#808080';
Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontFamily = "'Work Sans', Helvetica, Tahoma, Arial, sans-serif";
// ===========
// Line Chart
// ===========






// ==========
// Bar Chart
// ==========
const bctx = document.getElementById('barChart');
const barChart = new Chart(bctx, {
  type: 'bar',
  data: {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      label: 'Traffic (thousands)',
      data: [24, 57,72, 74, 43, 25, 15],
      backgroundColor: ['rgba(76,75,112, 0.8)', 'rgba(76,75,112, 0.7)', 'rgba(76,75,112, 0.8)', 'rgba(76,75,112, 0.7)', 'rgba(76,75,112, 0.8)', 'rgba(76,75,112, 0.7)', 'rgba(76,75,112, 0.8)'],
      hoverBackgroundColor: ['rgba(76,75,112, 1)', 'rgba(76,75,112, 0.9)', 'rgba(76,75,112, 1)', 'rgba(76,75,112, 0.9)', 'rgba(76,75,112, 1)', 'rgba(76,75,112, 0.9)', 'rgba(76,75,112, 1)'],
      borderWidth: [2, 2, 2, 2, 2, 2, 2],
      borderColor: ['#4C4B70', '#4C4B70', '#4C4B70', '#4C4B70', '#4C4B70', '#4C4B70', '#4C4B70']
    }]
  },
  options: {
    legend: {
      display: false
    }
  }
});



// ==============
// Doughnut Chart
// ==============
const dctx = document.getElementById('doughnutChart');
const doughnutChart = new Chart(dctx, {
    type: 'doughnut',
    data: {
      labels: ['Phones', 'Tablets', 'Desktop'],
      datasets: [
        {
          backgroundColor: ['#448AFF', '#92CCA6', '#7377bd'],
          data: [15, 20, 65]
        }
    ]
    },
    options: {
      // options go here
      cutoutPercentage: 55,
      legend: {
        position: 'right',
        labels: {
          padding: 20,
          boxWidth: 25
        }
      }
    }
});
