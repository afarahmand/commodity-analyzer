import Chart from 'chart.js';

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createChartPriceDiff = canvas => (
  new Chart(canvas, {
    type: 'line',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      elements: {
        point: {
          radius: 0
        }
      },
      responsive: false,
      title: {
        display: true,
        fontSize: 32,
        text: '% Difference in Closing Price from Prior Day'
      }
    }
  })
);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getChartPriceDiffParams = percentPricesFromInitPrice => {
  let closePrices = new Array(percentPricesFromInitPrice.length);

  let i = 0;
  while (i < closePrices.length) {
    closePrices[i] = [];
    i++;
  }

  percentPricesFromInitPrice.forEach((percentPrice, idx) => {
    i = 0;
    while (i < percentPrice.length) {
      closePrices[idx][i] = percentPrice[i] + 100;
      i++;
    }
  });

  let diffClosePrices = new Array(percentPricesFromInitPrice.length);

  i = 0;
  while (i < closePrices.length) {
    diffClosePrices[i] = [];
    diffClosePrices[i] = getDiffClosePricePercentages(closePrices[i]);
    i++;
  }

  return diffClosePrices;
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const getDiffClosePricePercentages = closePrices => {
  let diffClosePricePercentages = [];

  closePrices.forEach((closePrice, index) => {
    diffClosePricePercentages.push(
      100*Math.abs(closePrices[index + 1] - closePrice)/closePrice
    );
  });

  diffClosePricePercentages.pop();

  return diffClosePricePercentages;
};
