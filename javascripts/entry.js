import Chart from 'chart.js';
import { changeDisplayedCommodities, roundToHundreths } from './chartHub';
import { createChartMain } from './chartMain';
import { createChartPriceDiff } from './chartPriceDiff';
import { createChartPMF } from './chartPMF';

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

  const chartMain = createChartMain(canvas1);
  const chartPriceDiff = createChartPriceDiff(canvas2);
  const chartPMF = createChartPMF(canvas3);

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
