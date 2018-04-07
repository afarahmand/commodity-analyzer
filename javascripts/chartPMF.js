import Chart from 'chart.js';
import { roundToHundreths } from './chartControl';

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const calculateOccurrencesPerBucket = (buckets, sortedPrices) => {
  let occurrencesPerBucket = initOccurrencesPerBucket(buckets);
  let bucketThreshold = buckets[0];
  let bucketIndex = 0;

  sortedPrices.forEach(price => {
    while (price > bucketThreshold) {
      bucketIndex++;
      bucketThreshold = buckets[bucketIndex];
    }

    if (occurrencesPerBucket[bucketThreshold] === undefined) {
      occurrencesPerBucket[bucketThreshold]=1;
    } else {
      occurrencesPerBucket[bucketThreshold]+=1;
    }
  });

  return occurrencesPerBucket;
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const convertOccurrencesToProbabilities = (
  occurrencesPerBucket, numberOfSamples
) => {
  let probabilitiesPerThreshold = {};

  for (let bucket in occurrencesPerBucket) {
    if (occurrencesPerBucket.hasOwnProperty(bucket)) {
      probabilitiesPerThreshold[bucket] =
        100*occurrencesPerBucket[bucket]/numberOfSamples;
    }
  }

  return probabilitiesPerThreshold;
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createChartPMF = canvas => (
  new Chart(canvas, {
    type: 'line',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: false,
      title: {
        display: true,
        fontSize: 32,
        text: 'Probability of % Difference'.concat(
          ' Between Consecutive Day Closing Prices')
      },
      scales: {
        xAxes: [{
          ticks: {
            callback: function(tick, index, ticks) {
              const currTick = roundToHundreths(tick).toString();

              if (index === 0) {
                return "0 - ".concat(currTick);
              } else {
                return roundToHundreths(ticks[index-1]).toString()
                .concat(" - ")
                .concat(currTick);
              }
            }// return string here for the tick.
          }
        }]
      }
    }
  })
);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// gets parameters to chart probability mass function
export const getChartPMFParams = diffClosePrices => {
  let [
    sortedPricesManyDatasets,
    occurrencesPerBucket,
    probabilitiesPerBucket
  ] = initEmptyDataStructures(diffClosePrices.length);

  sortedPricesManyDatasets = sortPrices(diffClosePrices);

  const buckets = initBuckets();

  sortedPricesManyDatasets.forEach((sortedPricesOneDataset, datasetIndex) => {
    occurrencesPerBucket[datasetIndex] = calculateOccurrencesPerBucket(
      buckets, sortedPricesOneDataset
    );

    probabilitiesPerBucket[datasetIndex] = convertOccurrencesToProbabilities(
      occurrencesPerBucket[datasetIndex], sortedPricesOneDataset.length
    );
  });

  let Y = new Array(diffClosePrices.length);

  let i = 0;
  while (i < diffClosePrices.length) {
    Y[i] = buckets.map(pB => (probabilitiesPerBucket[i][pB]));
    i++;
  }

  return [buckets, Y];
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const initBuckets = () => (
  [
    0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.2, 2.6, 3.0,
    3.5, 4.0, 4.5, 5.0, 5.5, 8.0, 20.0
  ]
);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const initEmptyArrayOfArrays = numberOfDatasets => {
  let ds = new Array(numberOfDatasets);

  let i = 0;
  while (i < numberOfDatasets) {
    ds[i] = [];
    i++;
  }

  return ds;
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const initEmptyDataStructures = numberOfDatasets => {
  let sortedPricesManyDatasets = initEmptyArrayOfArrays(numberOfDatasets);
  let occurrencesPerBucket = initEmptyArrayOfArrays(numberOfDatasets);
  let probabilitiesPerBucket = initEmptyArrayOfArrays(numberOfDatasets);

  return [
    sortedPricesManyDatasets, occurrencesPerBucket, probabilitiesPerBucket
  ];
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const initOccurrencesPerBucket = buckets => {
  // Init occurrencesPerBucket with bucketThresholds as keys and 0 values
  let occurrencesPerBucket = {};

  buckets.forEach(bucketThreshold => {
    occurrencesPerBucket[bucketThreshold] = 0;
  });

  return occurrencesPerBucket;
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const sortPrices = diffClosePrices => {
  let sortedPrices = initEmptyArrayOfArrays(diffClosePrices.length);

  let i = 0;
  while (i < diffClosePrices.length) {
    sortedPrices[i] = diffClosePrices[i].slice(0).sort(
      function(a, b){return a - b;}
    );
    i++;
  }

  return sortedPrices;
};
