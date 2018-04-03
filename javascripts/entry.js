import Chart from 'chart.js';
import { changeDisplayedCommodities, roundToHundreths } from './chartHub';

document.addEventListener("DOMContentLoaded", () => {
  const canvas1 = document.getElementById("main-chart");
  const canvas2 = document.getElementById("price-difference-chart");
  const canvas3 = document.getElementById("pmf-chart");

  const chartWidth = '1000';
  const chartHeight = '600';

  canvas1.setAttribute('width', '900');
  canvas1.setAttribute('height', chartHeight);

  canvas2.setAttribute('width', chartWidth);
  canvas2.setAttribute('height', chartHeight);

  canvas3.setAttribute('width', chartWidth);
  canvas3.setAttribute('height', chartHeight);

  Chart.defaults.global.defaultFontFamily = 'Comfortaa';

  const chartMain = new Chart(canvas1, {
    type: 'line',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: false,
      title: {
        display: true,
        fontSize: 32,
        text: 'Prices of Selected Commodities'
      }
    }
  });

  const chartPriceDiff = new Chart(canvas2, {
    type: 'line',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: false,
      title: {
        display: true,
        fontSize: 32,
        text: '% Difference in Closing Price from Prior Day'
      }
    }
  });

  const chartPMF = new Chart(canvas3, {
    type: 'line',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: false,
      title: {
        display: true,
        fontSize: 32,
        text: 'Probability of % Difference'.concat(
          ' Between Consecutive Day Closing Prices')
      },
      scales: {
        xAxes: [{
          ticks: {
            callback: function(tick, index, ticks) {
              const currTick = roundToHundreths(tick).toString();

              if (index === 0) {
                return "0 - ".concat(currTick);
              } else {
                return roundToHundreths(ticks[index-1]).toString()
                .concat(" - ")
                .concat(currTick);
              }
            }// return string here for the tick.
          }
        }]
      }
    }
  });

  for(let i = 0; i < 7; i++) {
    document.getElementById(`cb${i}`)
    .addEventListener("click", e => {
      changeDisplayedCommodities(
        chartMain, chartPriceDiff, chartPMF, e.target.value
      );
    });
  }

  // document.getElementById("input-text")
  // .addEventListener("keyup", e => {
  //   console.log(e.target.value);
  // });
});
