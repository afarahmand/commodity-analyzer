const calculateOccurrencesPerBucket = (sortedPrices, min, max, step) => {
  let occurrencesPerBucket = initOccurrencesPerBucket(min, max, step);
  let bucketThreshold = min+step;

  sortedPrices.forEach(price => {
    while (price > bucketThreshold) {
      bucketThreshold+=step;
    }

    if (occurrencesPerBucket[bucketThreshold] === undefined) {
      occurrencesPerBucket[bucketThreshold]=1;
    } else {
      occurrencesPerBucket[bucketThreshold]+=1;
    }
  });

  return occurrencesPerBucket;
};

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

export const getChartPMFParams = (commodityName, prices, segments) => {
  const sortedPrices = prices.slice(0).sort(function(a, b){return a - b;});

  const min = sortedPrices[0];
  const max = sortedPrices[sortedPrices.length - 1];
  const step = (max - min)/segments;

  let occurrencesPerBucket = calculateOccurrencesPerBucket(
    sortedPrices, min, max, step
  );

  let probabilitiesPerBucket = convertOccurrencesToProbabilities(
    occurrencesPerBucket, sortedPrices.length
  );

  const title = "Probability of Closing Price Being Within a Price Interval";
  const label = "Probability [%]";
  // const X = Object.keys(occurrencesPerBucket);
  // const Y = X.map(pB => (occurrencesPerBucket[pB]));

  const X = Object.keys(probabilitiesPerBucket);
  const Y = X.map(pB => (probabilitiesPerBucket[pB]));

  return [title, label, X, Y];
};

const initOccurrencesPerBucket = (min, max, step) => {
  // Init occurrencesPerBucket with bucketThresholds as keys and 0 values
  let occurrencesPerBucket = {};
  let bucketThreshold = min+step;

  while (bucketThreshold <= max) {
    occurrencesPerBucket[bucketThreshold] = 0;
    bucketThreshold+=step;
  }

  return occurrencesPerBucket;
};
