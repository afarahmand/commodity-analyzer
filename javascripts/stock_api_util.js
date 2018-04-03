export const fetchStock = quandlCode => {
  const APIKEY = "hkJD88Y1dNFnFA5xjn3q";

  return $.ajax({
    url: `https://www.quandl.com/api/v3/datasets/`
      .concat(`${quandlCode}/data.json?`)
      .concat(`api_key=${APIKEY}&`)
      .concat('column_index=4&')
      .concat(`limit=1000`),
    method: 'GET'
  });
};

// url: `${root}WIKI/GE/data.json?api_key=${APIKEY}&limit=5&order=desc`,

// https://www.quandl.com/api/v3/datasets/CHRIS/CME_NG1/
// data.json?api_key=hkJD88Y1dNFnFA5xjn3q

const getDataset = commodity => {
  switch(commodity) {
    case "Copper":
    case "Crude Oil":
    case "Gold":
    case "Natural Gas":
    case "Palladium":
    case "Platinum":
    case "Silver":
      return "CHRIS";
  }
};

const getDatasetStock = commodity => {
  switch(commodity) {
    case "Copper":
      return "CME_HG1";
    case "Crude Oil":
      return "CME_CL1";
    case "Gold":
      return "CME_GC1";
    case "Natural Gas":
      return "CME_NG1";
    case "Palladium":
      return "CME_PA1";
    case "Platinum":
      return "CME_PL1";
    case "Silver":
      return "CME_SI1";
  }
};

// ${dataset}/${stock}
export const translateToQuandlCode = commodity => (
  getDataset(commodity)
  .concat("/")
  .concat(getDatasetStock(commodity))
);
