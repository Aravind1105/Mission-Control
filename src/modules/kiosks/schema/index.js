import gql from 'graphql-tag';

const FragmentLocation = {
  location: gql`
    fragment LocationForKiosk on Location {
      address {
        line1
        line2
        postalCode
        city
        state
        country
      }
    }
  `,
};

const FragmentInventory = {
  inventory: gql`
    fragment InventoryForKiosk on Inventory {
      loadCells {
        cellId
        planogramPosition
        products {
          _id
        }
        productLine {
          _id
          name
          images
          priceHistory {
            price
            default
            validForKiosks
          }
        }
      }
    }
  `,
};

const FragmentKioskOnKiosk = gql`
  fragment FragmentKiosk on Kiosk {
    _id
    name
    doorStatus
    serialNumber
    qrcode
    pin
    temperature {
      value
      updated
    }
    location {
      ...LocationForKiosk
    }
    ownerOrganization {
      _id
      address {
        properties {
          city
        }
      }
    }
    internet {
      signalStrength
    }
    session {
      type
    }
    inventory {
      ...InventoryForKiosk
    }
  }
  ${FragmentLocation.location}
  ${FragmentInventory.inventory}
`;

export const GET_ALL_KIOSKS_QUERY = gql`
  {
    getAllKiosks {
      _id
      name
      doorStatus
      serialNumber
      temperature {
        value
        updated
      }
      location {
        address {
          line1
          city
        }
      }
    }
  }
`;

export const GET_KIOSK_QUERY = gql`
  query kiosk($id: String!) {
    getKioskById(id: $id) {
      ...FragmentKiosk
    }
  }
  ${FragmentKioskOnKiosk}
`;

export const CREATE_KIOSK_MUTATION = gql`
  mutation kioskCreate($data: KioskInput!) {
    kioskCreate(data: $data) {
      ...FragmentKiosk
    }
  }
  ${FragmentKioskOnKiosk}
`;

export const UPDATE_KIOSK_MUTATION = gql`
  mutation kioskUpdate($id: String!, $data: KioskInput!) {
    kioskUpdate(id: $id, data: $data) {
      ...FragmentKiosk
    }
  }
  ${FragmentKioskOnKiosk}
`;

export const LOAD_CELL_CONFIG_MUTATION = gql`
  mutation modifyLoadCells($data: LoadCellsInput!) {
    configureLoadCells(data: $data) {
      _id
    }
  }
`;

export const RESET_LOAD_CELL_INVENTORY_MUTATION = gql`
  mutation resetLoadCell(
    $id: String!
    $cellId: String!
    $data: ResetLoadcellAmountInput!
  ) {
    resetLoadcellInventory(id: $id, cellId: $cellId, data: $data) {
      _id
    }
  }
`;

export const SET_PLANOGRAM_POSITION_MUTATION = gql`
  mutation setPlanogramPosition(
    $kioskId: String!
    $data: SetLoadcellPlanogramPositionInput!
  ) {
    setLoadcellPlanogramPosition(kioskId: $kioskId, data: $data) {
      _id
    }
  }
`;

export const KIOSK_REFILL_MUTATION = gql`
  mutation createRefill($kioskId: String!) {
    createRefill(kioskId: $kioskId) {
      _id
      sessionClosedAt
    }
  }
`;

export const KIOSK_RESET_MUTATION = gql`
  mutation resetKiosk($id: String!) {
    kioskReset(id: $id) {
      ...FragmentKiosk
    }
  }
  ${FragmentKioskOnKiosk}
`;
