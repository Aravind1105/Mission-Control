import React, { useState } from 'react';
import {
  Segment,
  Divider,
  Table,
  Header,
  Grid,
  Button,
  Icon,
} from 'semantic-ui-react';
import format from 'date-fns/format';
import { get, isEmpty } from 'lodash';

import './styles.less';
import WidgetItem from './WidgetItem';
import ConfirmationModal from '../../../shared/components/ConfirmationModal';

const PriceHistoryWidget = ({ activePriceHistory, priceHistory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState();

  const defaultPriceObj = priceHistory.find(el => el.default);
  const defaultPrice = get(defaultPriceObj, 'price', '');
  let filteredPriceHistory = priceHistory;

  // TODO: use show all to display all price history in a different way
  // if (!activePriceHistory) {
  //   filteredPriceHistory = priceHistory.slice(0, 10);
  // }

  // TODO: uncomment show all button if needed

  // TODO: uncomment delete button for active price history after delete feature for price history is confirmed

  return (
    <>
      <Segment>
        <Grid>
          <Grid.Row className="price-widget-header-row">
            <Grid.Column width="9">
              <Header as="h3">
                {activePriceHistory ? 'Active Kiosk Prices' : 'Price History'}
              </Header>
            </Grid.Column>
            {/* <Grid.Column width="7" textAlign="right">
              {!activePriceHistory && (
                <Button
                  icon
                  labelPosition="right"
                  basic
                  onClick={() => {}}
                  className="price-widget-show-all-btn"
                >
                  <span className="price-widget-show-all">Show all</span>
                  <Icon name="angle right" />
                </Button>
              )}
            </Grid.Column> */}
          </Grid.Row>
        </Grid>

        <Divider className="price-widget-divider" />
        {!activePriceHistory && (
          <span className="default-price-text">{`Default Price: ${defaultPrice} €`}</span>
        )}
        <Table
          basic="very"
          className="active-prices-widget-table"
          fixed
          singleLine
        >
          <Table.Body>
            {filteredPriceHistory.map(priceObj => {
              const { _id, price, validFrom, validForKiosk } = priceObj;
              const kioskName = get(validForKiosk, 'name', 'Default');
              const id = get(validForKiosk, 'id', '');
              const priceDisplay =
                price === defaultPrice
                  ? kioskName === 'Default'
                    ? price
                    : 'Default'
                  : price;
              const dateDisplay = format(
                new Date(validFrom),
                'dd-MM-yyyy, HH:mm:ss',
              );
              return (
                <WidgetItem
                  priceHistoryId={_id}
                  dateTime={dateDisplay}
                  price={priceDisplay}
                  kioskUrl={!isEmpty(id) ? `/kiosks/detail/${id}` : undefined}
                  kioskName={kioskName}
                  // showDelete={activePriceHistory}
                  // onClickDelete={() => {
                  //   setToDelete(_id);
                  //   setIsModalOpen(true);
                  // }}
                />
              );
            })}
          </Table.Body>
        </Table>
      </Segment>
      <ConfirmationModal
        title={'Delete Active Price'}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        confirmHandler={() => {
          //TODO: handle delete by using price history id from toDelete
          //TODO: unset toDelete after deleting
          setIsModalOpen(false);
        }}
        onClickNo={() => setToDelete('')}
      >
        <div className="price-history-delete-modal-text">
          Are you sure you want to change the product price on this Kiosk to
          default?
        </div>
      </ConfirmationModal>
    </>
  );
};

PriceHistoryWidget.defaultProps = {
  priceHistory: [],
};

export default PriceHistoryWidget;
