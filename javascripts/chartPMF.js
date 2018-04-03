// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const calculateOccurrencesPerBucket = sortedPrices => {
// const calculateOccurrencesPerBucket = (sortedPrices, min, max, step) => {
  // let occurrencesPerBucket = initOccurrencesPerBucket(min, max, step);
  const buckets = [
    0.4,
    0.8,
    1.2,
    1.6,
    2.0,
    2.5,
    3.0,
    5.0,
    7.0,
    20.0
  ];

  let occurrencesPerBucket = initOccurrencesPerBucket();
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

  for (let key in occurrencesPerBucket) {
    if (occurrencesPerBucket.hasOwnProperty(key)) {
      probabilitiesPerThreshold[key] =
        100*occurrencesPerBucket[key]/numberOfSamples;
    }
  }

  return probabilitiesPerThreshold;
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getChartPMFParams = (commodityName, prices, segments) => {
  let sortedPricesManyDatasets = new Array(prices.length);
  let occurrencesPerBucket = new Array(prices.length);
  let probabilitiesPerBucket = new Array(prices.length);

  let i = 0;
  while (i < sortedPricesManyDatasets.length) {
    sortedPricesManyDatasets[i] = [];
    occurrencesPerBucket[i] = [];
    probabilitiesPerBucket[i] = [];

    sortedPricesManyDatasets[i] = prices[i].slice(0).sort(
      function(a, b){return a - b;}
    );
    i++;
  }

  // sortedPrices = prices.slice(0).sort(function(a, b){return a - b;});
  let min, max, step;

  sortedPricesManyDatasets.forEach((sortedPrices, datasetIndex) => {
    min = sortedPrices[0];
    max = sortedPrices[sortedPrices.length - 1];
    step = (max - min)/segments;

    occurrencesPerBucket[datasetIndex] = calculateOccurrencesPerBucket(
      sortedPrices, min, max, step
    );

    probabilitiesPerBucket[datasetIndex] = convertOccurrencesToProbabilities(
      occurrencesPerBucket[datasetIndex], sortedPrices.length
    );
  });

  // const title = "Probability of the Difference
  // in Next Day Closing Prices Being Within an Interval";
  // const label = "Probability [%]";

  // const X = Object.keys(occurrencesPerBucket);
  // const Y = X.map(pB => (occurrencesPerBucket[pB]));

  // const X = Object.keys(probabilitiesPerBucket);
  const X = [
    0.4,
    0.8,
    1.2,
    1.6,
    2.0,
    2.5,
    3.0,
    5.0,
    7.0,
    20.0
  ];
  let Y = new Array(prices.length);

  i = 0;
  while (i < prices.length) {
    Y[i] = X.map(pB => (probabilitiesPerBucket[i][pB]));
    i++;
  }

  // return [title, label, X, Y];
  return [X, Y];
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const initOccurrencesPerBucket = (min, max, step) => {
//   // Init occurrencesPerBucket with bucketThresholds as keys and 0 values
//   let occurrencesPerBucket = {};
//   let bucketThreshold = min+step;
//
//   while (bucketThreshold <= max) {
//     occurrencesPerBucket[bucketThreshold] = 0;
//     bucketThreshold+=step;
//   }
//
//   debugger;
//
//   return occurrencesPerBucket;
// };

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const initOccurrencesPerBucket = () => {
  // Init occurrencesPerBucket with bucketThresholds as keys and 0 values
  let occurrencesPerBucket = {};
  const buckets = [
    0.4,
    0.8,
    1.2,
    1.6,
    2.0,
    2.5,
    3.0,
    5.0,
    7.0,
    20.0
  ];

  buckets.forEach(bucketThreshold => {
    occurrencesPerBucket[bucketThreshold] = 0;
  });

  return occurrencesPerBucket;
};
