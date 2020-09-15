import gql from 'graphql-tag';
import { productOnProductLine } from '../../products/schema';
import { userDetailOnUser } from '../../users/schema';

const FragmentLocation = {
  location: gql`
    fragment LocationForKiosk on Location {
      address {
        name
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
        priceTag
        productLine {
          _id
          name
          images
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
    notes
    orgId
    temperature {
      value
      updated
    }
    location {
      ...LocationForKiosk
    }
    ownerOrganization {
      _id
      name
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

const FragmentKioskOfflineOnKiosk = gql`
  fragment FragmentKioskOffline on AlertKioskOffline {
    kioskId {
      _id
      name
    }
  }
`;

const FragmentAlertDoorOpenOnKiosk = gql`
  fragment FragmentAlertDoorOpen on AlertDoorOpen {
    kioskId {
      _id
      name
      doorStatus
    }
  }
`;

const FragmentAlertHighTempOnKiosk = gql`
  fragment FragmentAlertHighTemp on AlertHighTemp {
    kioskId {
      _id
      name
    }
  }
`;

const FragmentAlertLowTempOnKiosk = gql`
  fragment FragmentAlertLowTemp on AlertLowTemp {
    kioskId {
      _id
      name
    }
  }
`;

export const GET_ALL_KIOSKS_GRID_QUERY = gql`
  query($data: GridRequest) {
    getKiosksGrid(data: $data) {
      total
      data {
        _id
        name
        doorStatus
        session {
          _id
          type
          orgId
        }
        temperature {
          value
          updated
        }
        location {
          address {
            name
            line1
            line2
            city
            state
            country
            postalCode
          }
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

export const KIOSK_RESET_MUTATION = gql`
  mutation resetKiosk($id: String!) {
    kioskReset(id: $id) {
      ...FragmentKiosk
    }
  }
  ${FragmentKioskOnKiosk}
`;

export const GET_ALERTS_GRID = gql`
  query gridAlerts($data: GridRequest) {
    gridAlerts(data: $data) {
      total
      data {
        _id
        orgId
        type
        severity
        status
        startDate
        endDate
        details {
          ...FragmentKioskOffline
          ...FragmentAlertDoorOpen
          ...FragmentAlertHighTemp
          ...FragmentAlertLowTemp
        }
      }
    }
  }
  ${FragmentKioskOfflineOnKiosk}
  ${FragmentAlertDoorOpenOnKiosk}
  ${FragmentAlertHighTempOnKiosk}
  ${FragmentAlertLowTempOnKiosk}
`;

export const GET_ALMOST_EMPTY_KIOSKS = gql`
  query getAlmostEmptyKiosks(
    $skip: Int
    $limit: Int
    $filter: KioskAlmostEmptyFilter
  ) {
    getAlmostEmptyKiosks(skip: $skip, limit: $limit, filter: $filter) {
      data {
        _id
        name
        orgId
        productsAmount
        inventory {
          loadCells {
            cellId
            productLine {
              ...product
            }
          }
        }
      }
      total
    }
  }
  ${productOnProductLine}
`;

export const GET_TEMPERATURE_LOGS = gql`
  query getTemperatureEventsByKioskWithResolution(
    $data: TemperatureEventsByKioskWithResolutionInput
  ) {
    getTemperatureEventsByKioskWithResolution(data: $data) {
      avgTemp
      maxTemp
      minTemp
      year
      kiosk
      year
      month
      day
      hour
    }
  }
`;
