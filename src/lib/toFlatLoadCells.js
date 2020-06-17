import get from 'lodash/get';

const getPrice = (priceArr, kioskId) => {
  const priceForKiosk = priceArr
    .reverse()
    .find(price => price.validForKiosks.includes(kioskId) || price.default);
  return priceForKiosk ? priceForKiosk.price : 0;
};

const toFlatLoadCellItem = (loadCells, kioskId) =>
  loadCells.map(el => ({
    ...el,
    productLine: el.productLine
      ? {
          _id: el.productLine._id,
          name: el.productLine.name,
          image: get(el, 'productLine.images.0', ''),
          price: getPrice(el.productLine.priceHistory, kioskId),
        }
      : {},
  }));

export default toFlatLoadCellItem;
