import { createSelector } from 'reselect';
import format from 'date-fns/format';
import get from 'lodash/get';

export const getAllTransactionsState = state => state.transactions.list;

export const getGridRefillsState = state => state.transactions.refillsList;

export const getTotalTransactionsCount = state =>
  state.transactions.totalTransactions;

export const getTotalGridRefillsCount = state =>
  state.transactions.totalRefills;

export const getTransactionsTableState = createSelector(
  getAllTransactionsState,
  transactions => {
    let newArr = [];
    transactions.forEach(({ itemsPurchased, created, ...rest }) => {
      const item = {
        transactionID: rest._id,
        type: rest.type,
        date: format(new Date(created), 'dd-MM-yyyy HH:mm:ss'),
        session: rest.session,
        total: rest.total,
        kioskName:
          (itemsPurchased[0].kiosk ? itemsPurchased[0].kiosk.name : '') ||
          'unknown',
      };
      const productsNames = {};
      let unknownElements = 0;
      itemsPurchased.forEach(({ productLine }) => {
        if (productLine.name && !productsNames[productLine.name]) {
          productsNames[productLine.name] = 0;
        } else if (productLine.name && !productsNames[productLine.name]) {
          productsNames[productLine.name] += 1;
        } else if (!productLine.name) {
          unknownElements += 1;
        }
      });
      if (unknownElements) {
        productsNames.unknown = unknownElements;
      }
      const products = Object.keys(productsNames)
        .map(elem => `${elem} (${productsNames[elem]})`)
        .join('\n');
      // const arr = itemsPurchased.reduce((prev, { productLine, price, tax }) => {
      //   const idx = prev.findIndex(el => el.id === productLine._id);
      //   if (~idx) {
      //     const total = Math.round((prev[idx].total + price) * 100) / 100;
      //     prev[idx].total = total;
      //   } else {
      //     prev.push({
      //       id: productLine._id,
      //       productName: (productLine ? productLine.name : '') || 'unknown',
      //       total: +price,
      //       tax,
      //       price,
      //     });
      //   }
      //   return prev;
      // }, []);

      // const product =
      //   arr.length === 1 ? { ...item, ...arr[0] } : [item, ...arr];
      item.productName = products;
      newArr = newArr.concat(item);
    });
    return newArr;
  },
);

export const getGridRefillsTableState = createSelector(
  getGridRefillsState,
  refills =>
    refills.map(refill => {
      const count = Number(get(refill, 'scale.count', 0));
      const price = Number(
        get(refill, 'scale.productLine.priceHistory[0].price', 0),
      ).toFixed(2);
      const total = (count * price).toFixed(2);
      return {
        date: format(new Date(refill.created || new Date()), 'dd-MM-yyyy HH:mm:ss'), //today
        // time: format(new Date(refill.created || new Date()), 'HH:mm:ss'),
        status: refill.status || 'undefined',
        kioskName: get(refill, 'kiosk.name', 'unknown'),
        productName: get(refill, 'scale.productLine.name', 'unknown'),
        type: refill.type || 'unknown',
        count,
        weight: get(refill, 'scale.weight', 0),
        price,
        total,
        loadCell: get(refill, 'scale.cellId', 'unknown'),
      };
    }),
);
