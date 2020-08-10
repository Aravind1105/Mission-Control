import { createSelector } from 'reselect';
import pick from 'lodash/pick';
import get from 'lodash/get';

export const selectorGetProducts = state => state.products.list;

export const getTotalProductsCount = state => state.products.totalProducts;

export const selectorGetProduct = state => state.products.product;

export const selectorGetProductFamily = state => state.products.family;

export const selectorGetProductTax = state => state.products.taxes;

export const getProductsHistory = createSelector(
  selectorGetProducts,
  products => products.map(({ _id, priceHistory }) => ({ _id, priceHistory })),
);

export const getProductsDropdownList = createSelector(
  selectorGetProducts,
  products => {
    const newProductsList = products
      .map(({ _id, name }) => ({
        value: _id,
        text: name,
        key: _id,
      }))
      .sort((a, b) => {
        const nameA = a.text.toUpperCase();
        const nameB = b.text.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    newProductsList.unshift({ value: '', text: 'All products', key: 'all' });
    return newProductsList;
  },
);

export const selectorProductTaxOptions = createSelector(
  selectorGetProductTax,
  taxes =>
    taxes.map(el => ({
      text: el.taxId,
      value: el.taxValue,
      key: el._id,
    })),
);

export const selectorGetSupplier = createSelector(
  selectorGetProducts,
  products => {
    let supplierList = [];
    products.reduce((prev, curr) => {
      if (prev.indexOf(curr.manufacturer) === -1) {
        prev.push(curr.manufacturer);
        supplierList.push({
          text: curr.manufacturer,
          value: curr.manufacturer,
          key: `${supplierList.length}`,
        });
      }
      return prev;
    }, []);
    supplierList.unshift({
      value: '',
      text: 'All',
      key: supplierList.length,
    });
    return supplierList;
  },
);

export const selectorGetProductFamilyForm = createSelector(
  selectorGetProductFamily,
  family =>
    family.reduce(
      (prev, curr) => {
        const category = curr.category.map(text => ({ text, value: text }));
        prev.families.push({
          value: curr._id,
          text: curr.name,
        });
        prev.categories[curr._id] = category;
        return prev;
      },
      { families: [], categories: {} },
    ),
);

export const selectorGetProductCategories = createSelector(
  selectorGetProductFamily,
  family => {
    const categories = family.reduce((prev, curr) => {
      const category = curr.category.map(text => ({
        text,
        value: text,
        key: `${curr.name}_${text}`,
      }));
      return [...prev, ...category];
    }, []);
    categories.unshift({
      value: 'All',
      text: `All (${categories.length})`,
      key: 'length',
    });
    return categories;
  },
);

const defaultFormInit = {
  name: '',
  manufacturer: '',
  description: '',
  category: '',
  tax: '',
  energy: '',
  fat: '',
  fatSaturated: '',
  carbo: '',
  carboSugar: '',
  fiber: '',
  protein: '',
  allergens: '',
  ingredientsList: '',
  salt: '',
  defaultPrice: '',
  defaultCost: '',
  orgId: '',
  images: [],
  packagingOptions: [
    {
      ean: ' ',
      unitCount: 1,
      grossWeightGrams: 0,
      packageWeightGrams: 0,
      netWeightGrams: 0,
      shelfLifeDays: 0,
      tolerancePercentage: 0,
      description: ' ',
    },
  ],
};

export const selectorGetProductInitValue = createSelector(
  selectorGetProduct,
  product => {
    if (!product) return defaultFormInit;
    const { packagingOptions, family, taxHistory, tax, ...rest } = product;
    rest.priceHistory = rest.priceHistory.map(el => ({
      ...el,
      price: el.price.toFixed(2),
    }));
    const [packaging] = packagingOptions.slice(-1);
    const priceHistory = rest.priceHistory.find(el => el.default);
    const initialValues = pick(rest, [
      'allergens',
      'carbo',
      'carboSugar',
      'category',
      'description',
      'energy',
      'fat',
      'fatSaturated',
      'fiber',
      'ingredientsList',
      'manufacturer',
      'name',
      'protein',
      'salt',
      'priceHistory',
      'images',
      'orgId',
    ]);
    return {
      ...defaultFormInit,
      ...initialValues,
      packagingOptions: [
        {
          ...defaultFormInit.packagingOptions[0],
          ...pick(packaging, [
            'ean',
            'unitCount',
            'grossWeightGrams',
            'netWeightGrams',
            'shelfLifeDays',
            'description',
          ]),
        },
      ],
      id: rest._id,
      defaultPrice: get(priceHistory, 'price', ''),
      defaultPriceId: get(priceHistory, '_id', ''),
      // family: get(product, 'family._id', ''),
      tax,
      defaultCost: (+rest.defaultCost).toFixed(2),
    };
  },
);
