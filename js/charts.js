// =====================================
// Chart settings using Chart.js library
// =====================================
Chart.defaults.global.defaultFontColor = '#808080';
Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontFamily = "'Work Sans', Helvetica, Tahoma, Arial, sans-serif";
// ===========
// Line Chart
// ===========
// const lctx = document.getElementById('lineChart');
const lctx = document.getElementById('lineChart').getContext('2d');
const fillPattern = lctx.createLinearGradient(0,500,0,0);
  fillPattern.addColorStop(0,"rgba(76, 75, 112, 0.9)");
  fillPattern.addColorStop(0.3,"rgba(76, 75, 112, 0.5)");
  fillPattern.addColorStop(1,"rgba(76, 75, 112, 0.3)");
const lineChart = new Chart(lctx, {
  type: 'line',
  data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: 'In thousands',
        backgroundColor: fillPattern,
        borderColor: '#555',
        data: [155, 2222, 513, 1789, 2456, 456, 1146, 250],
        fill: true,
        lineTension: 0,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#555',
        pointBorderWidth: 3,
        pointHoverBorderWidth: 4,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  },
  options: {
    responsive: true,
    legend: {
      display: false
    }
  }
});







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
    responsive: true,
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
      responsive: true,
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
