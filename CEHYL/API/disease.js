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

// epi_week is in form: YYYY-W** (** is the 2 digit week number)
// e.g. 2020-W07
// Returns a Promise
export const getEpiWeek = async epi_week => {
  const data = {...defaultData, filters: `{"epi_week": ${epi_week}}`};
  const keyList = [...Object.keys(data)];
  const url = formatURL(data, keyList, resource_id);
  return await getResponse(url).then(response => filterEmptyResults(response));
};

// Returns a Promise containing the latest Epi_Week in format YYYY-W** (** is the 2 digit week number)
export async function getLatestEpiWeekNum() {
  const data = {...defaultData, limit: 1};
  const keyList = [...Object.keys(data)];
  const url = formatURL(data, keyList, resource_id);
  return await getResponse(url).then(data => {
    return data['result']['records']['0']['epi_week'];
  });
}

// epi_week is in form: YYYY-W** (** is the 2 digit week number)
// e.g. 2020-W04
// Returns a list of strings representing the previous 4 weeks, inclusive of given epi_week
export const getPreviousFourWeeks = epi_week => {
  let [year, week] = epi_week.split('-');
  week = parseInt(week.substring(1));
  let epi_weeks = [epi_week];

  let counterYear = parseInt(year);
  let counterWeek = week;
  for (let i = 0; i < 3; i++) {
    counterWeek--;
    if (counterWeek == 0) {
      counterWeek = 52;
      counterYear--;
    }

    epi_weeks.push(
      `${counterYear}-W${counterWeek <= 9 ? '0' + counterWeek : counterWeek}`,
    );
  }
  return epi_weeks;
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
