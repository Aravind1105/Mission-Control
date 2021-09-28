import React from 'react';
import { Segment, Divider, Table, Header, Grid } from 'semantic-ui-react';
import './styles.less';
import WidgetItem from './WidgetItem';

const UsedKiosksWidget = ({ kioskData }) => {
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
            {kioskData.map(kiosk => (
              <WidgetItem kiosk={kiosk} />
            ))}
          </Table.Body>
        </Table>
      </Segment>
    </>
  );
};

export default UsedKiosksWidget;
