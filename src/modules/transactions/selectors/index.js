import { createSelector } from 'reselect';
import format from 'date-fns/format';

export const getAllTransactionsState = state => state.transactions.list;

export const getTotalTransactionsCount = state =>
  state.transactions.totalTransactions;

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
          (itemsPurchased[0]['kiosk'] ? itemsPurchased[0].kiosk.name : '') ||
          'unknown',
      };
      const arr = itemsPurchased.reduce((prev, { productLine, price, tax }) => {
        const idx = prev.findIndex(el => el.id === productLine._id);
        if (~idx) {
          const total = Math.round((prev[idx].total + price) * 100) / 100;
          prev[idx].total = total;
        } else {
          prev.push({
            id: productLine._id,
            productName: (productLine ? productLine.name : '') || 'unknown',
            total: +price,
            tax,
            price,
          });
        }
        return prev;
      }, []);

      const product =
        arr.length === 1 ? { ...item, ...arr[0] } : [item, ...arr];
      newArr = newArr.concat(product);
    });
    return newArr;
  },
);
