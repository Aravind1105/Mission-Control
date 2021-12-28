import React, { useEffect } from 'react';
import {
  Button,
  Header,
  Icon,
  Segment,
  Popup,
  Grid,
  Divider,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import history from 'lib/history';
import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';
import Loader from 'modules/shared/components/Loader';
import { getAlertsGrid } from '../../kiosks/actions';
import { getTotalAlerts } from '../../kiosks/selectors';
import './styles.less';

const sort = [
  {
    column: 'startDate',
    direction: 'DESC',
  },
];

export const ToolTip = () => (
  <Popup
    trigger={<Icon color="yellow" name="info circle" />}
    position="bottom center"
    wide
  >
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <b>Alerts Description</b>
          <Divider></Divider>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <b>High Temperature:</b>
              </Grid.Column>
              <Grid.Column>Above 7 °C for more than 10 min.</Grid.Column>
              <Grid.Column>
                <b>Low Temperature:</b>
              </Grid.Column>
              <Grid.Column>Below 2 °C for more than 15 min.</Grid.Column>
              <Grid.Column>
                <b>Tablet Internet disconnected:</b>
              </Grid.Column>
              <Grid.Column>
                Tablet has not been updated for over 15 min.
              </Grid.Column>
              <Grid.Column>
                <b>Tablet MQTT disconnected:</b>
              </Grid.Column>
              <Grid.Column>
                Tablet MQTT has not been connected for over 15 min.
              </Grid.Column>
              <Grid.Column>
                <b>Unauthorized Access:</b>
              </Grid.Column>
              <Grid.Column>
                Kiosk door is open, but without active session.
              </Grid.Column>
              <Grid.Column>
                <b>System Offline:</b>
              </Grid.Column>
              <Grid.Column>
                No event has been updated from Kiosk for more than 10 min.
              </Grid.Column>
              <Grid.Column>
                <b>Empty Purchase session:</b>
              </Grid.Column>
              <Grid.Column>
                No Product has been bought in that session.
              </Grid.Column>
              <Grid.Column>
                <b>Invalid Scales weight:</b>
              </Grid.Column>
              <Grid.Column>
                More products are detected than the current inventory.
              </Grid.Column>
              <Grid.Column>
                <b>Left/Right Scales disconnected:</b>
              </Grid.Column>
              <Grid.Column>
                Single/Multiple scales got disconnected on Left/Right Kiosk.
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Popup>
);

const Alerts = ({ alerts, isAlertsLoading }) => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t('Date / Time'),
      field: 'startDate',
      formatter: ({ startDate }) => {
        let [date, time] = startDate.split(' ');
        return `${date}, ${time}`;
      },
    },
    {
      title: t('Alert'),
      field: 'type',
    },
    // {
    //   title: t('Duration'),
    //   field: 'duration',
    // },
    // {
    //   title: t('Severity'),
    //   field: 'severity',
    // },
    // {
    //   title: t('Status'),
    //   field: 'status',
    // },
    {
      title: t('Kiosk'),
      field: 'details.kioskId.name',
    },
  ];

  const handleClick = () => {
    history.push('/dashboard/alerts');
  };

  const handlerClickRow = ({ details }) => {
    if (details.kioskId) {
      history.push(`/kiosks/detail/${details.kioskId._id}`);
    }
  };

  return (
    <Segment>
      {isAlertsLoading && <Loader />}
      <SegmentHeader>
        <Header as="h4" color="red">
          <Icon name="exclamation triangle" size="small" />
          <Header.Content>
            Alerts &nbsp;
            <ToolTip />
          </Header.Content>
        </Header>
        <div>
          <Button icon labelPosition="right" basic onClick={handleClick}>
            Show all
            <Icon name="angle right" />
          </Button>
        </div>
      </SegmentHeader>
      <CustomTable
        className="dashboard-table"
        sortByColumn="startDate"
        onRowClick={handlerClickRow}
        sortable
        selectable
        fixed
        data={alerts}
        columns={columns}
        excludeSortBy={[
          'status',
          'startDate',
          'duration',
          'type',
          'details.kioskId.name',
        ]}
        sortDirection="DESC"
      />
    </Segment>
  );
};

const mapStateToProps = state => ({
  total: getTotalAlerts(state),
  isAlertsLoading: state.kiosks.isAlertsLoading,
});

const mapDispatchToProps = {
  getAlertsGrid,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
