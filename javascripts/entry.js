import Chart from 'chart.js';
// import { handleSelectedCommodity } from './chart1';
import { fetchStock, handleClickedCommodity } from './stock_util';

document.addEventListener("DOMContentLoaded", () => {
  // Create event listeners for radio buttons
  let radioButtons = [];
  for(let i = 0; i < 6; i++) {
    document
    .getElementById(`rb${i}`)
    .addEventListener("click", handleClickedCommodity);
  }

  const canvas1 = document.getElementById("chart1");
  canvas1.setAttribute('width', '800');
  canvas1.setAttribute('height', '400');

  let data = [
    { x: 100, y: 100 },
    { x: 200, y: 300 },
    { x: 300, y: 200 }
  ];

  const optionsChart1 = {
    responsive: false,
    title: {
      display: true,
      text: 'Stock Price'
    }
  };

  // const chart = new Chart(canvas1, {
  //     type: 'line',
  //     data: {
  //       labels: [],
  //       datasets: [{
  //         data: [],
  //         label: "Price",
  //         borderColor: "#3e95cd",
  //         fill: false
  //       }]
  //     },
  //     options: optionsChart1
  // });

  const chart = new Chart(canvas1, {
      type: 'line',
      data: {
        labels: [data[0].x, data[1].x, data[2].x],
        datasets: [{
          data: [data[0].y, data[1].y, data[2].y],
          label: "Price",
          borderColor: "#3e95cd",
          fill: false
        }]
      },
      options: optionsChart1
  });





  let test;
  fetchStock("CHRIS", "CME_GC1").then(
    resp => {
      test = resp;
      console.log(resp);
      console.log(resp.dataset_data.start_date);
    },
    err => {
      console.log(err);
    }
  );
});
