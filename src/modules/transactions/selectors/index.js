import { createSelector } from 'reselect';

export const getAllTransactionsState = state => state.transactions.list;

export const getTotalTransactionsCount = state =>
  state.transactions.totalTransactions;

export const getTransactionsTableState = createSelector(
  getAllTransactionsState,
  transactions => {
    let newArr = [];
    transactions.forEach(({ itemsPurchased, ...rest }) => {
      const item = {
        transactionID: rest._id,
        created: rest.created,
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

      newArr = newArr.concat(item, arr);
    });
    return newArr;
  },
);
