import debounce from 'lodash/debounce';

const getCountries = (value, callback) => {
  if (value) {
    fetch(`https://restcountries.eu/rest/v2/name/${value}?fields=name`)
      .then(response => response.json())
      .then(response => {
        const options = response.map(el => ({
          value: el.name,
          label: el.name,
        }));
        callback(options);
      });
  } else callback([]);
};

const handlerGetCountries = (timeout = 200) => debounce(getCountries, timeout);

export default handlerGetCountries;
