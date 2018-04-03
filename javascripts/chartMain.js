import { roundToHundreths } from './chartHub';

export const convertToPercentPrices = inputPrices => {
  let initPrices = new Array(inputPrices.length); // First price of each dataset
  inputPrices.forEach((inputPrice, idx) => {
    initPrices[idx] = inputPrice[0];
  });

  let percentPrices = new Array(inputPrices.length);

  let i = 0;
  while (i < inputPrices.length) {
    percentPrices[i] = [];
    inputPrices[i].forEach(inputPrice => {
      percentPrices[i].push(
        roundToHundreths(100*(inputPrice - initPrices[i])/initPrices[i])
      );
    });
    i+=1;
  }

  return percentPrices;
};

export const getChartMainParams = (commodityName, closePrices) => {
  // const title = "Price of "
  //   .concat(commodityName)
  //   .concat(" Front-Month Futures Contract");
  // const label = getLabel(commodityName);
  const percentPricesFromInitPrice = convertToPercentPrices(closePrices);

  // return [title, label, dates, closePrices];
  // return [title, label, percentPricesFromInitPrice];
  return percentPricesFromInitPrice;
};

const getLabel = commodityName => {
  switch(commodityName) {
    case "Copper":
      return "[$/lb]";
    case "Crude Oil":
      return "[$/barrel]";
    case "Natural Gas":
      return "[$/10,000 mmBTU]";
    case "Gold":
    case "Palladium":
    case "Platinum":
    case "Silver":
      return "[$/oz]";
  }
};
