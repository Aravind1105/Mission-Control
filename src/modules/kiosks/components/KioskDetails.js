/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Grid, Segment, Header, Button,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import DetailsBreadcrumb from './DetailsBreadcrumb';
import { getKioskById } from '../selectors/kiosksSelector';
import { resetKioskSaga, loadKiosksSaga, openKioskSaga } from '../actions/kioskActions';

const KioskDetails = ({
  match, kiosk, resetKiosk, loadKiosks, openKiosk,
}) => {
  useEffect(() => {
    if (!kiosk) {
      console.log('FETCH ORGANIZATION');
      loadKiosks();
    }
  }, []);

  if (!kiosk) return false;

  const toggleResetKiosk = () => {
    if (window.confirm('Willst Du die Session wirklich zurücksetzen?')) {
      resetKiosk(kiosk);
    }
  };

  const toggleOpenDoor = () => {
    if (window.confirm('Willst Du das Kiosk wirklich im Refill Mode öffnen?')) {
      openKiosk(kiosk);
    }
  };

  const avgTemp = kiosk.temperature.value[0].$numberDecimal;
  const productLines = [];

  for (let i = 0; i < kiosk.inventory.loadCells.length; i += 1) {
    productLines.push({
      loadCell: kiosk.inventory.loadCells[i].cellId,
      loadCellProducts: kiosk.inventory.loadCells[i].products.length,
      productLine: kiosk.inventory.loadCells[i].productLine.name,
    });
  }

  const pl = productLines.map((productLine, idx) => {
    const key = idx + productLine.loadCell;
    const res = (
      <div key={key} style={{ marginTop: 10 }}>
        LoadCell {idx} : {productLine.productLine} -- amount:
        {JSON.stringify(productLines[idx])}
      </div>
    );
    return res;
  });
  return (
    <Grid stackable>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <DetailsBreadcrumb kioskName={kiosk.name} />
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Header as="h4">
                    <Header.Content>{kiosk.name}</Header.Content>
                  </Header>
                  <div>{`Door: ${kiosk.doorStatus}`}</div>
                  <div>{`Session: ${kiosk.session}`}</div>
                  <Button style={{ marginBottom: 5 }} onClick={toggleResetKiosk}>
                    Reset Door & Session
                  </Button>
                  <Button style={{ marginBottom: 5 }} onClick={toggleOpenDoor}>
                    Open Door
                  </Button>
                  <div>{`Average Temperature:  ${avgTemp} °C`}</div>
                  {pl}
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Segment>RFID</Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>

        <Grid.Column width={5}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Segment>Sales</Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>Inventory</Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  kiosk: getKioskById(ownProps.match.params.id)(state),
});

const mapDispatchToProps = dispatch => ({
  resetKiosk: kiosk => dispatch(resetKioskSaga(kiosk)),
  loadKiosks: () => dispatch(loadKiosksSaga()),
  openKiosk: kiosk => dispatch(openKioskSaga(kiosk)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(KioskDetails),
);
