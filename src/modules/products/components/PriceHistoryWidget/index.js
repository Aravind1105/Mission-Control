import React from 'react';
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

import './styles.less';
import WidgetItem from './WidgetItem';

const PriceHistoryWidget = ({
  activePriceHistory,
  priceHistory,
  kiosks,
  defaultPrice,
}) => {
  //   const filtered = priceHistory ? priceHistory.filter(el => !el.default) : [];
  //   const defaultPrice = priceHistory.find(el => el.default);
  const price = '3.00';
  const kioskName = '';
  return (
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width="11">
            <Header as="h3">
              {activePriceHistory ? 'Active Kiosk Prices' : 'Price History'}
            </Header>
          </Grid.Column>
          <Grid.Column>
            {!activePriceHistory && (
              <Button icon labelPosition="right" basic onClick={() => {}}>
                <span>Show all</span>
                <Icon name="angle right" />
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider />
      <Table
        basic="very"
        className="active-prices-widget-table"
        fixed
        singleLine
      >
        <Table.Body>
          <WidgetItem
            dateTime="12-05-2020, 08:15:20"
            price={
              price === defaultPrice
                ? kioskName === 'Default'
                  ? price
                  : 'Default'
                : price
            }
            kioskName={'Default'}
            showDelete={activePriceHistory}
          />
          <WidgetItem
            dateTime="12-05-2020, 08:15:20"
            price={
              price === defaultPrice
                ? kioskName === 'Default'
                  ? price
                  : 'Default'
                : price
            }
            kioskName={'qwertzuioplkjhgfds shjdhjhjhj'}
            kioskUrl={'/kiosks/detail/5da842cb37479f002dcbee88'}
            showDelete={activePriceHistory}
          />
          <WidgetItem
            dateTime="12-05-2020, 08:15:20"
            price={
              price === defaultPrice
                ? kioskName === 'Default'
                  ? price
                  : 'Default'
                : price
            }
            kioskName={'WHU'}
            kioskUrl={'/kiosks/detail/5da842cb37479f002dcbee88'}
            showDelete={activePriceHistory}
          />
          <WidgetItem
            dateTime="12-05-2020, 08:15:20"
            price={
              price === defaultPrice
                ? kioskName === 'Default'
                  ? price
                  : 'Default'
                : price
            }
            kioskName={'WHU'}
            kioskUrl={'/kiosks/detail/5da842cb37479f002dcbee88'}
            showDelete={activePriceHistory}
          />
        </Table.Body>
      </Table>
    </Segment>
  );
};

PriceHistoryWidget.defaultProps = {
  priceHistory: [],
};

export default PriceHistoryWidget;
