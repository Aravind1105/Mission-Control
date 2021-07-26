import gql from 'graphql-tag';
import { productOnProductLine } from '../../products/schema';
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
        isActive
        planogramPosition
        products {
          _id
        }
        priceTag
        productLine {
          _id
          name
          images
          defaultCost
          capacities {
            surfaceSize
            units
          }
        }
        surfaceSize
        occupancy
        maxQty
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
      support {
        email
        hotline
        hotlineAvailability
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
    controller {
      preAuth
      paymentType
      tabletLang
      minimumAge
      serviceCheck {
        enabled
        startTime
        endTime
      }
      memberCardEnabled
      technicianPin
      playList {
        _id
        name
        uri
        duration
        type
        enabled
        order
      }
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
const FragmentAlertUnauthorizedAccessOnKiosk = gql`
  fragment FragmentAlertUnauthorizedAccess on AlertUnauthAccess {
    kioskId {
      _id
      name
    }
  }
`;
const FragmentAlertTabletDisconnectedOnKiosk = gql`
  fragment FragmentAlertTabletDisconnected on AlertTabletDisconn {
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
        dayIncome
        doorStatus
        serialNumber
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
    getKioskWithCapacities(id: $id) {
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
export const CONFIGURE_KIOSK_PROPS = gql`
  mutation configureKioskProps($data: KioskPropsInput!) {
    configureKioskProps(data: $data) {
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
          ...FragmentAlertUnauthorizedAccess
          ...FragmentAlertTabletDisconnected
        }
      }
    }
  }
  ${FragmentKioskOfflineOnKiosk}
  ${FragmentAlertDoorOpenOnKiosk}
  ${FragmentAlertHighTempOnKiosk}
  ${FragmentAlertLowTempOnKiosk}
  ${FragmentAlertUnauthorizedAccessOnKiosk}
  ${FragmentAlertTabletDisconnectedOnKiosk}
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
  query($kioskId: String!, $from: DateTime!, $to: DateTime!, $limit: Int!) {
    getTemperatureEventsByKiosk(
      kioskId: $kioskId
      from: $from
      to: $to
      limit: $limit
    ) {
      _id
      kiosk
      type
      payload {
        message_timestamp
        message {
          sensors {
            temperature
          }
        }
      }
      created
      updated
    }
  }
`;
export const GET_ACTIVITY_LOGS = gql`
  query gridActivities(
    $skip: Int!
    $limit: Int!
    $kiosk: String!
    $period: Period
    $sort: Int
  ) {
    gridActivities(
      skip: $skip
      limit: $limit
      kiosk: $kiosk
      period: $period
      sort: $sort
    ) {
      total
      data {
        _id
        kiosk
        type
        created
        payload {
          fridge_id
          user_id
          session_id
          id
          message_timestamp
          type
          message {
            door_status
            touchedScales {
              weight
              id
            }
            scales {
              weight
              id
            }
            payment_terminal
          }
        }
      }
    }
  }
`;

export const DELETE_LOAD_CELL = gql`
  mutation deleteLoadCell($kioskId: String!, $cellId: String!) {
    deleteLoadCell(kioskId: $kioskId, cellId: $cellId) {
      ...FragmentKiosk
    }
  }
  ${FragmentKioskOnKiosk}
`;

export const UPDATE_PLAYLIST = gql`
  mutation updatePlayList($kioskId: String!, $data: [PlayListInput]!) {
    updatePlayList(kioskId: $kioskId, data: $data) {
      _id
      name
      uri
      duration
      type
      enabled
      order
    }
  }
`;

export const DELETE_PLAYLIST = gql`
  mutation deletePlayListContent($kioskId: String!, $contentId: String!) {
    deletePlayListContent(kioskId: $kioskId, contentId: $contentId) {
      _id
      name
      uri
      duration
      type
      enabled
      order
    }
  }
`;
