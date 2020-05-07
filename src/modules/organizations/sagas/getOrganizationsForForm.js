// TODO: replace this method to saga and GQL when API
// will be able to return single organization by name

const loadOptions = organizations => (inputValue, callback) => {
  console.log(inputValue);
  callback(
    organizations.filter(el =>
      el.label.toLowerCase().includes(inputValue.toLowerCase()),
    ),
  );
};

export default loadOptions;
