import get from 'lodash/get';

const toFlatLoadCellItem = loadCells =>
  loadCells.map(({ priceTag: price, ...el }) => ({
    ...el,
    productLine: el.productLine
      ? {
          _id: el.productLine._id,
          name: el.productLine.name,
          image: get(el, 'productLine.images.0', ''),
          defaultCost:el.productLine.defaultCost,
          priceHistory:el.productLine.priceHistory,
          price,  
        }
      : {},
  }));

export default toFlatLoadCellItem;
