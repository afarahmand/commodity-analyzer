export const getChartPMFParams = (commodityName, prices, segments) => {
  const title = "Probability of Closing Price Being Within a Price Interval";
  const label = "Probability [%]";

  let sortedPrices = prices.slice(0).sort(function(a, b){return a - b;});

  const min = sortedPrices[0];
  const max = sortedPrices[sortedPrices.length-1];
  const step = (max - min)/segments;

  let occurrencesPerBucket = {};
  let bucketThreshold = min;

  // Init occurrencesPerThreshold with thresholds as keys and 0 values
  while (bucketThreshold <= max) {
    occurrencesPerBucket[bucketThreshold] = 0;
    bucketThreshold+=step;
  }

  bucketThreshold = min;
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

  let probabilitiesPerThreshold = {};

  // Convert occurrences to probabilities
  for (let key in occurrencesPerBucket) {
    if (occurrencesPerBucket.hasOwnProperty(key)) {
      probabilitiesPerThreshold[key] =
        100*occurrencesPerBucket[key]/sortedPrices.length;
    }
  }

  // const X = Object.keys(occurrencesPerThreshold);
  // const Y = X.map(pB => (occurrencesPerThreshold[pB]));

  const X = Object.keys(probabilitiesPerThreshold);
  const Y = X.map(pB => (probabilitiesPerThreshold[pB]));

  return [title, label, X, Y];
};
