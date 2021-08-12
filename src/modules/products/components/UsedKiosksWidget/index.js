import React, { useState } from 'react';
import { Segment, Divider, Table, Header, Grid } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import history from 'lib/history';
import './styles.less';

const UsedKiosksWidget = ({ data }) => {
  // product line id
  const { id } = useParams();

  // TODO: uncomment delete button for active price history after delete feature for price history is confirmed

  return (
    <>
      <Segment>
        <Grid>
          <Grid.Row className="used-kiosks-widget-header-row">
            <Grid.Column width="16">
              <Header as="h3">Kiosks with this Product</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider className="used-kiosks-widget-divider" />
        <Table
          basic="very"
          className="used-kiosks-widget-table"
          fixed
          singleLine
        >
          <Table.Body>
            {/* {filteredUsedKiosks.map(priceObj => {
              const { _id, price, validFrom, validForKiosk } = priceObj;
              const kioskName = get(validForKiosk, 'name', 'Default');
              const id = get(validForKiosk, 'id', '');
              const dateDisplay = format(
                new Date(validFrom),
                'dd-MM-yyyy, HH:mm:ss',
              );
              return (
                <WidgetItem
                  priceHistoryId={_id}
                  dateTime={dateDisplay}
                  price={price.toFixed(2)}
                  kioskUrl={!isEmpty(id) ? `/kiosks/detail/${id}` : undefined}
                  kioskName={kioskName}
                  showDelete={activeUsedKiosks}
                  onClickDelete={() => {
                    setToDelete(_id);
                    setIsModalOpen(true);
                  }}
                />
              );
            })} */}
          </Table.Body>
        </Table>
      </Segment>
    </>
  );
};

export default UsedKiosksWidget;
