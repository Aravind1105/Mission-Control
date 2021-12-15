import { createSelector } from 'reselect';
import { pick, get } from 'lodash';
import { sort } from 'ramda';
import sortByText from 'lib/sortByText';

export const selectorGetProducts = state => state.products.list;

export const getTotalProductsCount = state => state.products.totalProducts;

export const selectorGetProduct = state => state.products.product;

export const selectorGetProductFamily = state => state.products.family;

export const selectorGetProductTax = state => state.products.taxes;

export const selectorGetProductPriceHistory = state =>
  state.kiosks.productsByOrgId;

export const getProductsHistory = createSelector(
  selectorGetProductPriceHistory,
  products => products.map(({ _id, priceHistory }) => ({ _id, priceHistory })),
);

export const getProductsDropdownList = createSelector(
  selectorGetProducts,
  products => {
    const productsList = products.map(({ _id, name }) => ({
      value: _id,
      text: name,
      key: _id,
    }));
    const sortedProductList = sortByText(productsList, 'text');

    return [{ value: '', text: 'All Products', key: 'all' }].concat(
      sortedProductList,
    );
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

export const selectorGetManufacturer = createSelector(
  state => state.products.manufacturers,
  manufacturers =>
    [
      {
        value: '',
        text: 'All Manufacturers',
        key: 'all',
      },
    ].concat(
      sort((a, b) => a < b, manufacturers).map(option => ({
        value: option,
        text: option,
        key: option,
      })),
    ),
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
    if (typeof family[0] !== 'undefined') {
      const cat = get(family[0], 'category', '');
      const categories = cat.map(text => ({
        text,
        value: text,
        key: `${family[0].name}_${text}`,
      }));
      categories.unshift({
        value: 'All',
        text: `All Categories  ` + `(${categories.length})`,
        key: 'length',
      });
      return categories;
    }
  },
);

const defaultFormInit = {
  id: '',
  name: '',
  manufacturer: '',
  articleNumber: '',
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
  capacitiesSurfaceSize_33: '',
  capacitiesSurfaceSize_50: '',
  capacitiesSurfaceSize_100: '',
  packagingOptionsEan: '',
  packagingOptionsUnitCount: 1,
  packagingOptionsGrossWeightGrams: '',
  packagingOptionsPackageWeightGrams: 0,
  packagingOptionsNetWeightGrams: { value: '', unit: 'g' },
  packagingOptionsShelfLifeDays: '',
  packagingOptionsTolerancePercentage: 0,
  packagingOptionsDescription: '',
  packagingOptionsPackageWeightGramsUnit: '',
};

export const selectorGetProductInitValue = createSelector(
  selectorGetProduct,
  product => {
    if (!product) return defaultFormInit;
    const {
      packagingOptions,
      family,
      taxHistory,
      tax,
      // capacities,
      ...rest
    } = product;
    rest.priceHistory = rest.priceHistory.map(el => ({
      ...el,
      price: el.price.toFixed(2),
    }));
    const packaging = packagingOptions[0];
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
      'articleNumber',
      'name',
      'id',
      'protein',
      'salt',
      'priceHistory',
      'images',
      'orgId',
      'capacities',
    ]);

    const capacitiesArray = initialValues.capacities;
    delete initialValues.capacities;
    return {
      ...defaultFormInit,
      ...initialValues,

      capacitiesSurfaceSize_33:
        typeof capacitiesArray[0] !== 'undefined'
          ? capacitiesArray[0].units
          : '',
      capacitiesSurfaceSize_50:
        typeof capacitiesArray[1] !== 'undefined'
          ? capacitiesArray[1].units
          : '',
      capacitiesSurfaceSize_100:
        typeof capacitiesArray[2] !== 'undefined'
          ? capacitiesArray[2].units
          : '',

      packagingOptionsEan: get(packaging, ['ean'], '') || '',
      packagingOptionsUnitCount: get(packaging, ['unitCount']),
      packagingOptionsGrossWeightGrams: get(packaging, ['grossWeightGrams']),
      packagingOptionsPackageWeightGrams: get(packaging, ['grossWeightGrams']),
      packagingOptionsNetWeightGrams: {
        value: get(packaging, ['netWeightGrams']),
        unit: get(packaging, ['netWeightGramsUnit'], 'g') || 'g',
      },
      packagingOptionsShelfLifeDays: get(packaging, ['shelfLifeDays']),
      packagingOptionsDescription: get(packaging, ['description']),
      id: rest._id,
      defaultPrice: get(priceHistory, 'price', ''),
      defaultPriceId: get(priceHistory, '_id', ''),
      // family: get(product, 'family._id', ''),
      tax,
      articleNumber: get(product, 'articleNumber', '') || '',
      defaultCost: (+rest.defaultCost).toFixed(2),
    };
  },
);

export const getDefaultPriceHistoryState = state =>
  state.products.defaultPriceHistory;

export const getActivePriceHistoryState = state =>
  state.products.activePriceHistory;

export const getKiosksWithProductState = state =>
  state.products.kiosksWithProduct;

export const getPaginationState = state => state.products.pagination;
