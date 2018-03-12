import { fetchStock, translateToQuandlCode } from './stock_api_util';
import { getChartMainParams } from './chartMain';
import { getChartPriceDiffParams } from './chartPriceDiff';
import { getChartPMFParams } from './chartPMF';

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const changeDisplayedCommodity = (
  chartMain, chartPriceDiff, chartPMF, commodityName
) => {
  fetchStock(translateToQuandlCode(commodityName)).then(
    apiResponse => {

      const [
        titleChartMain,
        labelChartMain,
        dates,
        closePrices
      ] = getChartMainParams(commodityName, apiResponse);

      const [
        titleChartPriceDiff,
        labelChartPriceDiff,
        diffClosePrices
      ] = getChartPriceDiffParams(commodityName, closePrices);

      // pmfChart
      // const [
      //   titlePMF,
      //   labelPMF,
      //   priceBuckets,
      //   bucketProbabilities
      // ] = getChartPMFParams(commodityName, closePrices, 100);

      const [
        titlePMF,
        labelPMF,
        priceBuckets,
        bucketProbabilities
      ] = getChartPMFParams(commodityName, diffClosePrices, 10);

      updateChart(
        chartMain, titleChartMain, labelChartMain, dates, closePrices
      );

      updateChart(
        chartPriceDiff,
        titleChartPriceDiff,
        labelChartPriceDiff,
        dates,
        diffClosePrices
      );

      updateChart(
        chartPMF, titlePMF, labelPMF, priceBuckets, bucketProbabilities
      );
    }
  );
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const clearChart = chart => {
  while (chart.data.labels.length > 0) {
    chart.data.labels.pop();
    chart.data.datasets[0].data.pop();
  }
  chart.update();
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const updateChart = (
  chart, newTitle, newLabel, newX, newY
) => {
  clearChart(chart);

  let i = 0;
  while (i < newX.length) {
    chart.data.labels.push(newX[i]);
    chart.data.datasets[0].data.push(newY[i]);
    i++;
  }

  chart.options.title.text = newTitle;
  chart.data.datasets[0].label = newLabel;
  chart.update();
};
