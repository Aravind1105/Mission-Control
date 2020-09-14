import { createSelector } from 'reselect';
import format from 'date-fns/format';
import get from 'lodash/get';

export const getAllTransactionsState = state => state.transactions.list;

export const getGridRefillsState = state => state.transactions.refillsList;

export const getTotalTransactionsCount = state =>
  state.transactions.totalTransactions;

export const getTotalGridRefillsCount = state =>
  state.transactions.totalRefills;

// export const getTransactionsTableState = createSelector(
//   getAllTransactionsState,
//   transactions => {
//     let newArr = [];
//     transactions.forEach(({ itemsPurchased, created, ...rest }) => {
//       const item = {
//         transactionID: rest._id,
//         type: rest.type,
//         date: format(new Date(created), 'dd-MM-yyyy HH:mm:ss'),
//         session: rest.session,
//         total: rest.total,
//         kioskName:
//           (itemsPurchased[0].kiosk ? itemsPurchased[0].kiosk.name : '') ||
//           'unknown',
//       };
//       const productsNames = {};
//       let unknownElements = 0;
//       itemsPurchased.forEach(({ productLine }) => {
//         if (productLine.name && !productsNames[productLine.name]) {
//           productsNames[productLine.name] = 1;
//         } else if (productLine.name && !productsNames[productLine.name]) {
//           productsNames[productLine.name] += 1;
//         } else if (!productLine.name) {
//           unknownElements += 1;
//         }
//      t
//       if (unknownElements) {
//         productsNames.unknown = unknownElements;
//       }
//       const products = Object.keys(productsNames)
//         .map(elem => `${elem} (${productsNames[elem]})`)
//         .join('\n');
//       // const arr = itemsPurchased.reduce((prev, { productLine, price, tax }) => {
//       //   const idx = prev.findIndex(el => el.id === productLine._id);
//       //   if (~idx) {
//       //     const total = Math.round((prev[idx].total + price) * 100) / 100;
//       //     prev[idx].total = total;
//       //   } else {
//       //     prev.push({
//       //       id: productLine._id,
//       //       productName: (productLine ? productLine.name : '') || 'unknown',
//       //       total: +price,
//       //       tax,
//       //       price,
//       //     });
//       //   }
//       //   return prev;
//       // }, []);

//       // const product =
//       //   arr.length === 1 ? { ...item, ...arr[0] } : [item, ...arr];
//       item.productName = products;
//       newArr = newArr.concat(item);
//     });
//     return newArr;
//   },
// );

export const getTransactionsTableState = createSelector(
  getAllTransactionsState,
  transactions => {
    let newArr = [];
    transactions.forEach(
      ({ itemsPurchased, created, paymentMethod, ...rest }) => {
        const item = {
          transactionID: rest._id,
          membercardId:
            paymentMethod.length > 0 ? paymentMethod[0].membercardId : '',
          type: rest.type,
          created: format(new Date(created), 'dd-MM-yyyy, HH:mm:ss'),
          session: rest.session,
          total: rest.total,
          price: 0,
          productName: 'Total',
          quantity: itemsPurchased.length,
          kioskName:
            (itemsPurchased[0].kiosk ? itemsPurchased[0].kiosk.name : '') ||
            'unknown',
        };
        const arr = itemsPurchased.reduce(
          (prev, { productLine, price, tax }) => {
            const idx = prev.findIndex(el => el.id === productLine._id);
            let quantity = 1;
            if (~idx) {
              const total = Math.round((prev[idx].total + price) * 100) / 100;
              prev[idx].total = total;
              quantity += 1;
              prev[idx].quantity = quantity;
            } else {
              prev.push({
                id: productLine ? productLine._id : '' || 'unknown',
                productName: (productLine ? productLine.name : '') || 'unknown',
                total: +price,
                tax,
                price,
                quantity,
              });
            }
            return prev;
          },
          [],
        );

        item.uniqueProducts = arr.length;
        const product =
          arr.length === 1 ? [{ ...item, ...arr[0] }] : [item, ...arr];
        newArr = newArr.concat([product]);
      },
    );
    return newArr;
  },
);

export const getGridRefillsTableState = createSelector(
  getGridRefillsState,
  refills => {
    let newArr = [];
    refills.forEach(refill => {
      const item = {
        refillsId: refill._id,
        created: format(
          new Date(refill.created || new Date()),
          'dd-MM-yyyy, HH:mm:ss',
        ),
        kioskName: get(refill, 'kiosk.name', 'unknown'),
      };

      if (refill.scale.length > 1) {
        item.productName = 'Total';
        item.price = '';
      }

      let refillsTotalPrice = 0;
      const arr = refill.scale.reduce(
        (prev, { productLine, count, weight, cellId }) => {
          if (productLine) {
            const total = (count * productLine.defaultPrice).toFixed(2);
            let status = '';
            if (count > 0) {
              status = 'Added';
            } else if (count < 0) {
              status = 'Removed';
            }
            prev.push({
              id: productLine._id,
              productName: (productLine ? productLine.name : '') || 'unknown',
              total,
              price: productLine.defaultPrice,
              count,
              weight,
              loadCell: cellId || 'unknown',
              status,
            });
            refillsTotalPrice += parseFloat(total);
          }
          return prev;
        },
        [],
      );

      item.uniqueProducts = arr.length;
      item.total = refillsTotalPrice.toFixed(2);

      const product =
        arr.length === 1 ? [{ ...item, ...arr[0] }] : [item, ...arr];
      newArr = newArr.concat([product]);
    });
    return newArr;
  },
);

export const getWidgetDataState = state => {
  const {
    totalNumberOfTransactions,
    averagePurchaseValue,
    totalNumberOfProductsSold,
    totalNetIncome,
    totalNumberOfProductsAdded,
    totalGrossValueOfRefills,
    totalNumberOfProductsRemoved,
    averageSpoilageRate,
  } = state.transactions.widgetData;
  return {
    totalNumberOfTransactions: totalNumberOfTransactions || 0,
    totalNumberOfProductsSold: totalNumberOfProductsSold || 0,
    totalNetIncome: Number(totalNetIncome || 0).toFixed(2),
    averagePurchaseValue: Number(averagePurchaseValue || 0).toFixed(2),
    totalNumberOfProductsAdded: totalNumberOfProductsAdded || 0,
    totalNumberOfProductsRemoved: Math.abs(totalNumberOfProductsRemoved) || 0,
    averageSpoilageRate: Number(averageSpoilageRate || 0).toFixed(2),
    totalGrossValueOfRefills: Number(totalGrossValueOfRefills || 0).toFixed(2),
  };
};
