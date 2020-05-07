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

export const getProductsSimpleList = (id = '') =>
  createSelector(selectorGetProducts, products =>
    products
      .map(({ _id, name }) => ({
        value: _id,
        label: name,
      }))
      .filter(el => el.value !== id),
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
  family: '',
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
  packagingOptions: [
    {
      ean: '',
      unitCount: 1,
      grossWeightGrams: '',
      packageWeightGrams: '',
      netWeightGrams: '',
      shelfLifeDays: '',
      tolerancePercentage: '',
      description: '',
    },
  ],
};

export const selectorGetProductInitValue = createSelector(
  selectorGetProduct,
  product => {
    if (!product) return defaultFormInit;
    const { packagingOptions, family, taxHistory, ...rest } = product;
    const tax = taxHistory ? taxHistory.slice(-1) : null;
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
            'packageWeightGrams',
            'netWeightGrams',
            'shelfLifeDays',
            'tolerancePercentage',
            'description',
          ]),
        },
      ],
      id: rest._id,
      defaultPrice: get(priceHistory, 'price', ''),
      defaultPriceId: get(priceHistory, '_id', ''),
      family: family._id,
      tax: get(tax, '0.taxEntry.taxValue', ''),
    };
  },
);
