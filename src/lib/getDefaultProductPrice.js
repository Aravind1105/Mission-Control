import get from 'lodash/get';

const getDefaultProductPrice = ({ products, productId, kioskId }) => {
  const product = products.find(({ _id }) => _id === productId);
  const priceList = product ? [...product.priceHistory] : [];
  const priceHistory =
    priceList.reverse().find(el => el.validForKiosk === kioskId) ||
    priceList.find(el => el.default);
  const price = get(priceHistory, 'price', 0);
  return price.toFixed(2);
};

export default getDefaultProductPrice;
