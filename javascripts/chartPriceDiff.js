export const getChartPriceDiffParams = (commodityName, closePrices) => {
  const title = "Difference In Closing Price from Prior Day";
  const label = "Price Difference [$]";
  const diffClosePrices = getDiffClosePrices(closePrices);

  return [title, label, diffClosePrices];
};

const getDiffClosePrices = closePrices => {
  let diffClosePrices = [];

  closePrices.forEach((closePrice, index) => {
    diffClosePrices.push(
      // closePrices[index + 1] - closePrice
      Math.abs(closePrices[index + 1] - closePrice)
    );
  });

  diffClosePrices.pop();

  return diffClosePrices;
};
