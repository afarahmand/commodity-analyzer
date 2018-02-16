import Chart from 'chart.js';
import {
  changeDisplayedCommodity,
  updateChart
} from './stock_util';

document.addEventListener("DOMContentLoaded", () => {
  const canvas1 = document.getElementById("main-chart");
  canvas1.setAttribute('width', '1000');
  canvas1.setAttribute('height', '400');

  const chart1 = new Chart(canvas1, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          data: [],
          label: "Closing Price",
          borderColor: "#3e95cd",
          fill: false
        }]
      },
      options: {
        responsive: false,
        title: {
          display: true,
          text: 'Stock Price'
        }
      }
  });

  for(let i = 0; i < 7; i++) {
    document.getElementById(`rb${i}`)
    .addEventListener("click", e => {
      changeDisplayedCommodity(chart1, e.target.value);
    });
  }
});
