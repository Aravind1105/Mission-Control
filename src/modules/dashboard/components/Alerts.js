import React, { useState, useEffect } from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';
import { getAlertsGrid } from '../../kiosks/actions';
import {
  getKiosksAlertsForTable,
  getTotalAlerts,
} from '../../kiosks/selectors';

const sortValue = {
  // kiosk: 'kiosk',
  date: 'startDate',
  alert: 'type',
};

const sort = [
  {
    column: 'startDate',
    direction: 'ASC',
  },
];

const Alerts = ({ getAlertsGrid, alerts, total }) => {
  const [rowLimit, setRowLimit] = useState(6);

  useEffect(() => {
    const data = { limit: 6, sort };
    getAlertsGrid({ data });
  }, []);

  const { t } = useTranslation();
  const columns = [
    {
      title: t('Date / Time'),
      field: 'date',
    },
    {
      title: t('Alert'),
      field: 'alert',
    },
    {
      title: t('Kiosk'),
      field: 'kiosk',
    },
  ];

  const handlerToggle = () => {
    setRowLimit(val => (val ? 0 : 6));
    if (rowLimit === 6) {
      const data = { limit: 0 };
      getAlertsGrid({ data });
    }
  };

  const getData = ({ sort }) => {
    const data = {
      limit: rowLimit,
    };
    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }
    getAlertsGrid({ data });
  };

  return (
    <Segment>
      <SegmentHeader>
        <Header as="h4" color="red">
          <Icon name="exclamation triangle" size="small" />
          <Header.Content>Alerts</Header.Content>
        </Header>
        <div>
          <Button icon labelPosition="right" basic onClick={handlerToggle}>
            Show all
            <Icon name={`angle ${rowLimit ? 'right' : 'down'}`} />
          </Button>
        </div>
      </SegmentHeader>
      <CustomTable
        sortByColumn="date"
        sortable
        fixed
        data={alerts}
        columns={columns}
        rowLimit={rowLimit}
        getData={getData}
      />
    </Segment>
  );
};

const mapStateToProps = state => ({
  alerts: getKiosksAlertsForTable(state),
  total: getTotalAlerts(state),
});

const mapDispatchToProps = {
  getAlertsGrid,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
