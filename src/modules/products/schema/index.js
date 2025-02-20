import gql from 'graphql-tag';

// const familyOnProductFamily = gql`
//   fragment family on ProductFamily {
//     name
//     category
//     _id
//   }
// `;

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
    articleNumber
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
    tax
    taxHistory {
      taxEntry {
        taxId
        taxValue
      }
    }
    packagingOptions {
      ean
      description
      unitCount
      grossWeightGrams
      packageWeightGrams
      netWeightGrams
      netWeightGramsUnit
      shelfLifeDays
      tolerancePercentage
    }
    priceHistory {
      price
      default
      validForKiosk
      _id
      updated
    }
    capacities {
      surfaceSize
      units
    }
  }
`;

export const GET_ALL_PRODUCTS_QUERY = gql`
  {
    getProductLines {
      _id
      name
      manufacturer
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
        articleNumber
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

export const GET_PRODUCT_LINES_BY_ORG_ID = gql`
  query($orgId: String!) {
    getProductLinesByOrgId(orgId: $orgId) {
      _id
      name
      priceHistory {
        price
        default
        validForKiosk
        _id
        updated
      }
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

// export const GET_PRODUCTS_FAMILY_QUERY = gql`
//   {
//     getProductFamilies {
//       ...family
//     }
//   }
//   ${familyOnProductFamily}
// `;

export const GET_ASSETS_FOR_NEW_PRODUCT_QUERY = gql`
  {
    taxFindAll {
      ...taxItem
    }
  }
  ${taxItemOnTax}
`;

export const GET_PRODUCT_BY_ID_QUERY = gql`
  query($id: String!) {
    getProductLineById(id: $id) {
      ...product
    }
    taxFindAll {
      ...taxItem
    }
  }
  ${productOnProductLine}
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
  mutation createProductLine($data: ProductLineInput!, $image: String) {
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

export const DELETE_PRODUCT_LINE_MUTATION = gql`
  mutation deleteProductLine($id: String!) {
    deleteProductLine(id: $id) {
      _id
      name
    }
  }
`;

export const UPLOAD_PRODUCT_LINE_IMAGE_MUTATION = gql`
  mutation updateProductLineImage($id: String!, $image: String!) {
    updateProductLineImage(id: $id, image: $image) {
      _id
      images
    }
  }
`;

export const DELETE_PRODUCT_LINE_IMAGE_MUTATION = gql`
  mutation deleteProductLineImage($id: String!) {
    deleteProductLineImage(id: $id) {
      _id
    }
  }
`;

export const priceHistory = gql`
  fragment priceHistory on PriceHistory {
    _id
    price
    validForKiosk {
      id
      name
    }
    validFrom
    validTo
    default
  }
`;

export const GET_PRODUCT_PRICE_HISTORY = gql`
  query($productLineId: String!) {
    getDefaultProductLinePriceHistory(productLineId: $productLineId) {
      ...priceHistory
    }
    getProductLineActivePriceHistory(productLineId: $productLineId) {
      ...priceHistory
    }
  }
  ${priceHistory}
`;

export const DELETE_PRODUCT_LINE_ACTIVE_PRICE = gql`
  mutation deleteActivePriceHistory(
    $productLineId: String!
    $priceHistoryId: String!
  ) {
    deleteActivePriceHistory(
      productLineId: $productLineId
      priceHistoryId: $priceHistoryId
    ) {
      ...priceHistory
    }
  }
  ${priceHistory}
`;

export const ARCHIVE_PRODUCTLINE = gql`
  mutation archiveProductLine($productLineId: String!) {
    archiveProductLine(productLineId: $productLineId)
  }
`;

export const DUPLICATE_PRODCUTLINE = gql`
  mutation duplicateProductLine($productLineId: String!) {
    duplicateProductLine(productLineId: $productLineId) {
      ...product
    }
  }
  ${productOnProductLine}
`;

export const GET_MANUFACTURERS = gql`
  {
    getManufacturers
  }
`;

export const GET_KIOSKS_WITH_PRODUCT = gql`
  query getProductLineLinkedKiosks($productLineId: String!) {
    getProductLineLinkedKiosks(productLineId: $productLineId) {
      _id
      name
      serialNumber
      cabelIds
    }
  }
`;
