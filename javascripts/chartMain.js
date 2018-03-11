const filterColumns = apiResponse => {
  let dates = [];
  let closePrices = [];

  apiResponse.dataset_data.data.forEach(row => {
      if (row[4] !== null) {
        dates.unshift(row[0]);
        closePrices.unshift(row[4]);
      }
      // else if (lastNonNullPrice) {
      //   dates.unshift(row[0]);
      //   closePrices.unshift(lastNonNullPrice);
      // }
    }
  );

  return [dates, closePrices];
};

export const getChartMainParams = (commodityName, apiResponse) => {
  const title = "Price of "
    .concat(commodityName)
    .concat(" Front-Month Futures Contract");
  const label = getLabel(commodityName);

  const [dates, closePrices] = filterColumns(apiResponse);

  return [title, label, dates, closePrices];
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
