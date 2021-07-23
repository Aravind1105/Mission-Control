import { createSelector } from 'reselect';
import format from 'date-fns/format';
import get from 'lodash/get';

export const getAllTransactionsState = state => state.transactions.list;

export const getGridRefillsState = state => state.transactions.refillsList;

export const getGridProductsState = state => state.transactions.productList;

export const getTotalTransactionsCount = state =>
  state.transactions.totalTransactions;

export const getTotalGridRefillsCount = state =>
  state.transactions.totalRefills;

export const getTotalGridProductsCount = state =>
  state.transactions.totalProducts;

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
          membercardId: get(paymentMethod[0], 'membercardId', '') || '',
          type: rest.type,
          created: format(new Date(created), 'dd-MM-yyyy, HH:mm:ss'),
          session: rest.session,
          articleNumber: '',
          total: rest.total,
          price: 0,
          productName: 'Total',
          quantity: itemsPurchased.length,
          kioskName: get(itemsPurchased[0].kiosk, 'name', '') || 'unknown',
        };
        const arr = itemsPurchased.reduce(
          (prev, { productLine, price, tax }) => {
            let idx = -1;
            if (productLine) {
              idx = prev.findIndex(el => el.id === productLine._id);
            }
            let quantity = 1;
            if (~idx) {
              const total = Math.round((prev[idx].total + price) * 100) / 100;
              prev[idx].total = total;
              prev[idx].quantity += quantity;
            } else {
              prev.push({
                id: get(productLine, '_id', '') || 'unknown',
                productName: get(productLine, 'name', '') || 'unknown',
                total: +price,
                articleNumber: get(productLine, 'articleNumber', '') || '',
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
        kioskName: get(refill, 'kiosk.name', '') || 'unknown',
      };
      const newScale = refill.scale.filter(elem => elem.count !== 0);
      if (newScale.length > 1) {
        item.productName = 'Total';
        item.cost = '';
      }

      let refillsTotalCost = 0;
      const arr = newScale.reduce(
        (prev, { productLine, count, weight, cellId, refillCost}) => {
          if (productLine && count !== 0) {
            var refillCost = (refillCost || productLine.defaultCost).toFixed(2)
            const total = (Math.abs(count) * refillCost).toFixed(2);
            let status = '';
            if (count > 0) {
              status = 'Added';
            } else if (count < 0) {
              status = 'Removed';
            }
            prev.push({
              id: productLine._id,
              productName: get(productLine, 'name', '') || 'unknown',
              total,
              cost: refillCost,
              articleNumber: get(productLine, 'articleNumber', '') || '',
              count,
              weight,
              loadCell: cellId || '',
              status,
            });
            refillsTotalCost += parseFloat(total);
          }
          return prev;
        },
        [],
      );

      item.uniqueProducts = arr.length;
      item.total = refillsTotalCost.toFixed(2);

      const product =
        arr.length === 1 ? [{ ...item, ...arr[0] }] : [item, ...arr];
      if (arr.length) {
        newArr = newArr.concat([product]);
      }
    });
    return newArr;
  },
);

export const getGridProductsTableState = createSelector(
  getGridProductsState,
  products => {
    let newArr = [];
    products.forEach(
      ({
        productLine,
        totalCost,
        totalGrossSales,
        totalRemovedCost,
        refilled,
        sold,
        removed,
      }) => {
        const item = {
          // productId: get(productLine, '_id', '') || '',
          productName: get(productLine, 'name', '') || '',
          defaultPrice: get(productLine, 'defaultPrice', 0) || '',
          defaultCost: get(productLine, 'defaultCost', 0) || '',
          totalCost: Number(totalCost || 0).toFixed(2),
          totalGrossSales: Number(totalGrossSales || 0).toFixed(2),
          totalRemovedCost: Number(totalRemovedCost || 0).toFixed(2),
          refilled: refilled || 0,
          sold: sold || 0,
          removed: removed || 0,
        };
        newArr.push(item);
      },
    );
    return newArr;
  },
);

export const getWidgetDataState = state => {
  const {
    totalNumberOfTransactions,
    averagePurchaseValue,
    totalNumberOfProductsSold,
    totalNetIncome,
    totalGrossIncome,
    totalNumberOfProductsAdded,
    totalGrossValueOfRefills,
    totalNumberOfProductsRemoved,
    averageSpoilageRate,
    leastSoldProductName,
    leastSoldProductValue,
    mostSoldProductName,
    mostSoldProductValue,
    mostRefilledProductName,
    mostRefilledProductValue,
    mostRemovedProductName,
    mostRemovedProductValue,
    totalCostValueOfReplenishedProducts,
    totalSaleValueOfReplenishedProducts,
  } = state.transactions.widgetData;
  return {
    totalNumberOfTransactions: totalNumberOfTransactions || 0,
    totalNumberOfProductsSold: totalNumberOfProductsSold || 0,
    totalNetIncome: Number(totalNetIncome || 0).toFixed(2),
    totalGrossIncome: Number(totalGrossIncome || 0).toFixed(2),
    averagePurchaseValue: Number(averagePurchaseValue || 0).toFixed(2),
    totalNumberOfProductsAdded: totalNumberOfProductsAdded || 0,
    totalNumberOfProductsRemoved: Math.abs(totalNumberOfProductsRemoved) || 0,
    averageSpoilageRate: Number(averageSpoilageRate || 0).toFixed(2),
    leastSoldProductName: leastSoldProductName || ' ',
    leastSoldProductValue: leastSoldProductValue || 0,
    mostSoldProductName: mostSoldProductName || '',
    mostSoldProductValue: mostSoldProductValue || 0,
    mostRefilledProductName: mostRefilledProductName || ' ',
    mostRefilledProductValue: mostRefilledProductValue || 0,
    mostRemovedProductName: mostRemovedProductName || ' ',
    mostRemovedProductValue: mostRemovedProductValue || 0,
    totalGrossValueOfRefills: Number(totalGrossValueOfRefills || 0).toFixed(2),
    totalCostValueOfReplenishedProducts:
      totalCostValueOfReplenishedProducts || 0,
    totalSaleValueOfReplenishedProducts:
      totalSaleValueOfReplenishedProducts || 0,
  };
};
