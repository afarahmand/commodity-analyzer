import Chart from 'chart.js';
import { changeDisplayedCommodity } from './chartHub';

document.addEventListener("DOMContentLoaded", () => {
  const canvas1 = document.getElementById("main-chart");
  const canvas2 = document.getElementById("price-difference-chart");
  const canvas3 = document.getElementById("pmf-chart");

  const chartWidth = '1000';
  const chartHeight = '600';

  canvas1.setAttribute('width', chartWidth);
  canvas1.setAttribute('height', chartHeight);

  canvas2.setAttribute('width', chartWidth);
  canvas2.setAttribute('height', chartHeight);

  canvas3.setAttribute('width', chartWidth);
  canvas3.setAttribute('height', chartHeight);

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
          // borderColor: "#3e95cd",
          borderColor: "red",
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
          backgroundColor: "green",
          // borderColor: "#3e95cd",
          fill: true
        }]
      },
      options: {
        responsive: false,
        title: {
          display: true,
          fontSize: 32,
          text: 'Probability of Closing Price Being Within a Price Interval'
        },
        scales: {
          xAxes: [{
            ticks: {
              callback: function(tick, index, ticks) {
                return "< ".concat(
                  (Math.round(100*parseFloat(tick))/100).toString()
                );
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
