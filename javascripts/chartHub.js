import { fetchStock, translateToQuandlCode } from './stock_api_util';
import { convertToPercentPrices, getChartMainParams } from './chartMain';
import { getChartPriceDiffParams } from './chartPriceDiff';
import { getChartPMFParams } from './chartPMF';

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const addCommodity = (
  chartMain, chartPriceDiff, chartPMF, commodityName
) => {
  fetchStock(translateToQuandlCode(commodityName)).then(
    apiResponse => {
      // (1) Grab new data via API
      // (2) Create new date arr with dates that all datasets have data
      //   in this step, only new data is reconciled
      // (3) Reconcile already charted data (not necessary)

      const [dates, percentPricesFromInitPrice] = filterAndReconcile(
        chartMain.data.labels, chartMain.data.datasets, apiResponse
      );

      const diffClosePrices =
        getChartPriceDiffParams(commodityName, percentPricesFromInitPrice);

      const [
        priceBuckets,
        bucketProbabilities
      ] = getChartPMFParams(commodityName, diffClosePrices, 40);

      updateChart(
        chartMain,
        dates,
        percentPricesFromInitPrice,
        commodityName
      );

      updateChart(
        chartPriceDiff,
        dates,
        diffClosePrices,
        commodityName
      );

      updateChart(
        chartPMF, priceBuckets, bucketProbabilities, commodityName
      );
    }
  );
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const removeCommodity = (
  chartMain, chartPriceDiff, chartPMF, commodityName
) => {
  removeDataset(chartMain, commodityName);
  removeDataset(chartPriceDiff, commodityName);
  removeDataset(chartPMF, commodityName);
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const changeDisplayedCommodities = (
  chartMain, chartPriceDiff, chartPMF, commodityName
) => {
  if (chartIncludesCommodity(chartMain, commodityName)) {
    removeCommodity(chartMain, chartPriceDiff, chartPMF, commodityName);
  } else {
    addCommodity(chartMain, chartPriceDiff, chartPMF, commodityName);
  }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const chartIncludesCommodity = (chart, commodityName) => {
  let i = 0;
  while (i < chart.data.datasets.length) {
    if (chart.data.datasets[i].label === commodityName) {
      return true;
    }
    i++;
  }

  return false;
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const clearChart = chart => {
  while (chart.data.labels.length > 0) {
    chart.data.labels.pop();

    chart.data.datasets.forEach(dataset => {
      dataset.data.pop();
    });
  }
  chart.update();
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Filters API response to remove bad data then
//   further limits data to those dates for which all datasets (already
//   charted and new) have good data
const filterAndReconcile = (
  alreadyChartedDates, alreadyChartedDatasets, apiResponse
) => {
  let [newDates, newClosePrices] = filterApiResponse(apiResponse);

  let [reconciledDates, reconciledClosePrices] = reconcile(
    newDates, newClosePrices, alreadyChartedDates, alreadyChartedDatasets
  );

  return [reconciledDates, reconciledClosePrices];
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Filter out bad data received from server
const filterApiResponse = apiResponse => {
  let dates = [];
  let closePrices = [];

  apiResponse.dataset_data.data.forEach(row => {
      if (row[1] !== null) {
        dates.unshift(row[0]);
        closePrices.unshift(row[1]);
      }
    }
  );

  return [dates, closePrices];
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const getColor = commodityName => {
  switch(commodityName) {
    case "Copper":
      return "orange";
    case "Crude Oil":
      return "black";
    case "Gold":
      return "gold";
    case "Natural Gas":
      return "red";
    case "Palladium":
      return "green";
    case "Platinum":
      return "blue";
    case "Silver":
      return "grey";
  }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const reconcile = (
  newDates, newClosePrices, alreadyChartedDates, alreadyChartedDatasets
) => {
  if (alreadyChartedDates.length === 0) {
    return [newDates, convertToPercentPrices([newClosePrices])];
  }

  let reconciledDates = [];
  let reconciledClosePrices = new Array(alreadyChartedDatasets.length + 1);

  let newPercPrices = convertToPercentPrices([newClosePrices]).pop();

  // Init
  let i = 0;
  while (i <= alreadyChartedDatasets.length) {
    reconciledClosePrices[i] = [];
    i+=1;
  }

  alreadyChartedDates.forEach((alreadyChartedDate, idx) => {
    if (newDates.includes(alreadyChartedDate)) {
      reconciledDates.push(alreadyChartedDate);

      i = 0;
      while (i < alreadyChartedDatasets.length) {
        reconciledClosePrices[i].push(alreadyChartedDatasets[i].data[idx]);
        i+=1;
      }
      reconciledClosePrices[i].push(newPercPrices[idx]);
    }
  });

  // Return date arr and arr of arr for price datasets
  return [reconciledDates, reconciledClosePrices];
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const removeDataset = (chart, commodityName) => {
  let newDatasetsArr = [];

  chart.data.datasets.forEach(dataset => {
    if (dataset.label !== commodityName) {
      newDatasetsArr.push(dataset);
    }
  });

  let i = chart.data.datasets.length;
  let len = i;

  while (i > 0) {
    chart.data.datasets.pop();
    i--;
  }

  newDatasetsArr.forEach(dataset => {
    chart.data.datasets.push(dataset);
  });

  chart.update();
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const roundToHundreths = num => (
  Math.round(100*parseFloat(num))/100
);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const updateChart = (
  chart, dates, closePricesAllDatasets, commodityName
) => {
  clearChart(chart);

  // Init empty dataset objects within the chart
  chart.data.datasets.push(
    {
      data: [],
      label: commodityName,
      borderColor: getColor(commodityName),
      fill: false
    }
  );


  let i = 0;
  while (i < dates.length) {
    chart.data.labels.push(dates[i]);

    closePricesAllDatasets.forEach((closePricesOneDataset, datasetIndex) => {
      chart.data.datasets[datasetIndex].data.push(closePricesOneDataset[i]);
    });
    i++;
  }

  chart.update();
};
