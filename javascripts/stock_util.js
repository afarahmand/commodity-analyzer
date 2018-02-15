// export const fetchStock = (dataset, stock) => (
//   $.ajax({
//     url: `https://www.quandl.com/api/v3/datasets/
//     ${dataset}/
//     ${stock}/
//     data.json?
//     api_key=hkJD88Y1dNFnFA5xjn3q&
//     limit=5`,
//     method: 'GET'
//   })
// );

export const fetchStock = (dataset, stock) => {
  const root = "https://www.quandl.com/api/v3/datasets/";
  const APIKEY = "hkJD88Y1dNFnFA5xjn3q";
  return $.ajax({
    url: `${root}${dataset}/${stock}/data.json?api_key=${APIKEY}&limit=5&order=desc`,
    // url: `${root}WIKI/GE/data.json?api_key=${APIKEY}&limit=5&order=desc`,
    method: 'GET'
  });
};

export const handleSelectedCommodity = radioButton => {
  console.log(radioButton.value);
};
