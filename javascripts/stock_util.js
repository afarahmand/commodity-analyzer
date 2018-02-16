const clearChart = chart => {
  while (chart.data.labels.length > 0) {
    chart.data.labels.pop();
    chart.data.datasets[0].data.pop();
  }
  chart.update();
};

export const fetchStock = (dataset, stock) => {
  const root = "https://www.quandl.com/api/v3/datasets/";
  const APIKEY = "hkJD88Y1dNFnFA5xjn3q";
  return $.ajax({
    url: `${root}${dataset}/${stock}/data.json?api_key=${APIKEY}&limit=1000`,
    // url: `${root}WIKI/GE/data.json?api_key=${APIKEY}&limit=5&order=desc`,
    method: 'GET'
  });
};

export const changeDisplayedCommodity = (chart, commodityName) => {
  let code = translateToQuandlCode(commodityName);
  const dataset = "CHRIS";
  let codePrefix = "CME_";

  fetchStock(dataset, codePrefix.concat(code)).then(
    resp => {
      let dates = [];
      let prices = [];

      // Filter out desired data (date and closing price)
      resp.dataset_data.data.forEach(row => {
          dates.push(row[0]);
          prices.push(row[4]);
        }
      );
      dates = dates.reverse();
      updateChart(chart, dates, prices);
    }
  );
};

export const translateToQuandlCode = commodity => {
  switch(commodity) {
    case "Copper":
      return "HG1";
    case "Crude Oil":
      return "CL1";
    case "Gold":
      return "GC1";
    case "Natural Gas":
      return "NG1";
    case "Palladium":
      return "PA1";
    case "Platinum":
      return "PL1";
    case "Silver":
      return "SI1";
  }
};

const updateChart = (chart, newDates, newPrices) => {
  clearChart(chart);

  let i = 0;
  while (i < newDates.length) {
    chart.data.labels.push(newDates[i]);
    chart.data.datasets[0].data.push(newPrices[i]);
    i++;
  }
  chart.update();
};
