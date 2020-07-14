import gql from 'graphql-tag';

const familyOnProductFamily = gql`
  fragment family on ProductFamily {
    name
    category
    _id
  }
`;

const taxItemOnTax = gql`
  fragment taxItem on Tax {
    taxId
    taxValue
    _id
  }
`;

export const productOnProductLine = gql`
  fragment product on ProductLine {
    _id
    name
    category
    manufacturer
    description
    energy
    fat
    fatSaturated
    salt
    protein
    fiber
    ingredientsList
    allergens
    carbo
    carboSugar
    images
    defaultCost
    orgId
    taxHistory {
      taxEntry {
        taxId
        taxValue
      }
    }
    family {
      _id
      name
    }
    packagingOptions {
      ean
      description
      unitCount
      grossWeightGrams
      packageWeightGrams
      netWeightGrams
      shelfLifeDays
      tolerancePercentage
    }
    priceHistory {
      price
      default
      validForKiosk
      _id
    }
  }
`;

export const GET_ALL_PRODUCTS_QUERY = gql`
  {
    getProductLines {
      _id
      name
      priceHistory {
        price
        default
        validForKiosk
      }
    }
  }
`;

export const GET_ALL_PRODUCTS_EXTENDED_QUERY = gql`
  query($data: GridRequest) {
    productLinesGrid(data: $data) {
      total
      data {
        _id
        name
        category
        manufacturer
        defaultPrice
        packagingOptions {
          grossWeightGrams
        }
      }
    }
    getProductFamilies {
      name
      category
    }
  }
`;

export const GET_PRODUCT_LINE_BY_ID = gql`
  query($id: String!) {
    getProductLineById(id: $id) {
      ...product
    }
  }
  ${productOnProductLine}
`;

export const GET_PRODUCTS_FAMILY_QUERY = gql`
  {
    getProductFamilies {
      ...family
    }
  }
  ${familyOnProductFamily}
`;

export const GET_ASSETS_FOR_NEW_PRODUCT_QUERY = gql`
  {
    getProductFamilies {
      ...family
    }
    taxFindAll {
      ...taxItem
    }
  }
  ${familyOnProductFamily}
  ${taxItemOnTax}
`;

export const GET_PRODUCT_BY_ID_QUERY = gql`
  query($id: String!) {
    getProductLineById(id: $id) {
      ...product
    }
    getProductFamilies {
      ...family
    }
    taxFindAll {
      ...taxItem
    }
  }
  ${productOnProductLine}
  ${familyOnProductFamily}
  ${taxItemOnTax}
`;

export const CREATE_PRODUCT_LINE_PRICE_MUTATION = gql`
  mutation createPrice($id: String!, $data: PriceInput!) {
    createProductLinePrice(id: $id, data: $data) {
      _id
      name
    }
  }
`;

export const UPDATE_PRODUCT_LINE_PRICE_MUTATION = gql`
  mutation updatePrice($id: String!, $data: UpdateProductLinePrice!) {
    updateProductLinePrice(id: $id, data: $data) {
      ...product
    }
  }
  ${productOnProductLine}
`;

export const CREATE_PRODUCT_LINE_MUTATION = gql`
  mutation createProductLine($data: ProductLineInput!, $image: Upload) {
    createProductLine(data: $data, image: $image) {
      ...product
    }
  }
  ${productOnProductLine}
`;

export const UPDATE_PRODUCT_LINE_MUTATION = gql`
  mutation updateProductLine(
    $id: String!
    $data: UpdateProductLineInput!
    $image: Upload
  ) {
    updateProductLine(id: $id, data: $data, image: $image) {
      ...product
    }
  }
  ${productOnProductLine}
`;
