import { createSelector } from 'reselect';
import pick from 'lodash/pick';
import get from 'lodash/get';
import sortByText from 'lib/sortByText';

export const selectorGetProducts = state => state.products.list;

export const getTotalProductsCount = state => state.products.totalProducts;

export const selectorGetProduct = state => state.products.product;

export const selectorGetProductFamily = state => state.products.family;

export const selectorGetProductTax = state => state.products.taxes;

export const selectorGetProductPriceHistory = state => state.kiosks.productsByOrgId;

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

    return [{ value: '', text: 'All products', key: 'all' }].concat(
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

export const selectorGetSupplier = createSelector(
  selectorGetProducts,
  products => {
    const supplierList = products.reduce((prev, curr, i) => {
      if (!prev.length || !prev.some(el => el.value === curr.manufacturer)) {
        return prev.concat({
          text: curr.manufacturer,
          value: curr.manufacturer,
          key: `${i}_${curr.manufacturer}`,
        });
      }
      return prev;
    }, []);

    return [
      {
        value: '',
        text: 'All',
        key: 'all',
      },
    ].concat(sortByText(supplierList, 'value'));
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
  articleNumber:'',
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
      ean: '',
      unitCount: 1,
      grossWeightGrams: 0,
      packageWeightGrams: 0,
      netWeightGrams: 0,
      shelfLifeDays: 0,
      tolerancePercentage: 0,
      description: '',
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
      'articleNumber',
      'name',
      'protein',
      'salt',
      'priceHistory',
      'images',
      'orgId',
      'capacities',
    ]);

    //convert capacities field (array of objects) to Formik expected format
    const capacities = { "surfaceSize_33": 0, "surfaceSize_50": 0, "surfaceSize_100": 0, };
    initialValues.capacities.forEach(capacity => {
      switch (capacity.surfaceSize) {
        case 33:
          capacities["surfaceSize_33"] = capacity.units || 0;
          break;
        case 50:
          capacities["surfaceSize_50"] = capacity.units || 0;
          break;
        case 100:
          capacities["surfaceSize_100"] = capacity.units || 0;
          break;
        default:
          break;
      }
    });
    initialValues["capacities"] = capacities;

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
            'netWeightGramsUnit',
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
