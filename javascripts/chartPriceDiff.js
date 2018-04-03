export const getChartPriceDiffParams = (
  commodityName, percentPricesFromInitPrice
) => {
  // const title = "Percent Difference In Closing Price from Prior Day";
  // const label = "Price Difference [%]";
  // const diffClosePrices = getDiffClosePrices(closePrices);
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

  // const diffClosePrices = getDiffClosePricePercentages(closePrices);

  let diffClosePrices = new Array(percentPricesFromInitPrice.length);

  i = 0;
  while (i < closePrices.length) {
    diffClosePrices[i] = [];
    diffClosePrices[i] = getDiffClosePricePercentages(closePrices[i]);
    i++;
  }

  // return [title, label, diffClosePrices];
  return diffClosePrices;
};

// const getDiffClosePrices = closePrices => {
//   let diffClosePrices = [];
//
//   closePrices.forEach((closePrice, index) => {
//     diffClosePrices.push(
//       Math.abs(closePrices[index + 1] - closePrice)
//     );
//   });
//
//   diffClosePrices.pop();
//
//   return diffClosePrices;
// };

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
