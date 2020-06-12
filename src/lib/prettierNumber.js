const prettierNumber = value => {
  const price = Number.isNaN(value) ? 0 : value;
  return Number(price).toFixed(2);
};

export default prettierNumber;
