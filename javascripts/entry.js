import Chart from 'chart.js';
import { changeDisplayedCommodity } from './chartHub';

document.addEventListener("DOMContentLoaded", () => {
  const canvas1 = document.getElementById("main-chart");
  const canvas2 = document.getElementById("price-difference-chart");
  const canvas3 = document.getElementById("pmf-chart");

  canvas1.setAttribute('width', '1000');
  canvas1.setAttribute('height', '400');

  canvas2.setAttribute('width', '1000');
  canvas2.setAttribute('height', '400');

  canvas3.setAttribute('width', '1000');
  canvas3.setAttribute('height', '400');

  const chartMain = new Chart(canvas1, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          data: [],
          label: "Price per Standard Unit",
          borderColor: "#3e95cd",
          fill: false
        }]
      },
      options: {
        responsive: false,
        title: {
          display: true,
          fontSize: 32,
          text: 'Commodity Price'
        }
      }
  });

  const chartPriceDiff = new Chart(canvas2, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          data: [],
          label: "Price per Standard Unit",
          borderColor: "#3e95cd",
          fill: false
        }]
      },
      options: {
        responsive: false,
        title: {
          display: true,
          fontSize: 32,
          text: 'Commodity Price'
        }
      }
  });

  const chartPMF = new Chart(canvas3, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          data: [],
          label: "Probability",
          borderColor: "#3e95cd",
          fill: true
        }]
      },
      options: {
        responsive: false,
        title: {
          display: true,
          fontSize: 20,
          text: 'Probability of Closing Price Being Within a Price Interval'
        },
        scales: {
          xAxes: [{
            ticks: {
              callback: function(tick, index, ticks) {
                return (Math.round(100*parseFloat(tick))/100).toString();
              }// return string here for the tick.
            }
          }]
        }
      }
    });

  for(let i = 0; i < 7; i++) {
    document.getElementById(`rb${i}`)
    .addEventListener("click", e => {
      changeDisplayedCommodity(
        chartMain, chartPriceDiff, chartPMF, e.target.value
      );
    });
  }

  // document.getElementById("input-text")
  // .addEventListener("keyup", e => {
  //   console.log(e.target.value);
  // });
});
