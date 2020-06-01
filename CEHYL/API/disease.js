// Weekly Infectious Disease Bulletin Cases - Data.gov.sg
// https://data.gov.sg/dataset/weekly-infectious-disease-bulletin-cases

// CKAN datastore search
// https://data.gov.sg/dataset/ckan-datastore-search

export const resource_id = 'ef7e44f1-9b14-4680-a60a-37d2c9dda390';

// For week filtering, add on to the defaultData's object
// {...defaultData, filters: '{"epi_week": "2020-W07"}'}
export const defaultData = {
  sort: 'epi_week desc',
  fields: 'epi_week,disease,no._of_cases',
};

export const filterEmptyResults = response => {
  // response is the parsed json data obtained from getResponse
  const records = response['result']['records'];
  return records.filter(record => record['no._of_cases'] !== '0');
};

export const getParamStr = (key, data, separator) => {
  return `${separator}${key}=${encodeURIComponent(data[key])}`;
};

// data is a object containing keys and their respective values
export const formatURL = (data, keyList, resource_id) => {
  let url = `https://data.gov.sg/api/action/datastore_search?resource_id=${encodeURIComponent(
    resource_id,
  )}`;

  for (let i = 0, len = keyList.length; i < len; i++) {
    const key = keyList[i];
    url += getParamStr(key, data, '&');
  }
  return url;
};

// Returns a Promise with data based on given url query
export const getResponse = url => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};
