export const getChartPriceDiffParams = (commodityName, closePrices) => {
  const title = "Percent Difference In Closing Price from Prior Day";
  const label = "Price Difference [%]";
  // const diffClosePrices = getDiffClosePrices(closePrices);
  const diffClosePrices = getDiffClosePricePercentages(closePrices);

  return [title, label, diffClosePrices];
};

const getDiffClosePrices = closePrices => {
  let diffClosePrices = [];

  closePrices.forEach((closePrice, index) => {
    diffClosePrices.push(
      Math.abs(closePrices[index + 1] - closePrice)
    );
  });

  diffClosePrices.pop();

  return diffClosePrices;
};

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
