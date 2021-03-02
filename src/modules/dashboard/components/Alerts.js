import React, { useEffect } from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import history from 'lib/history';
import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';
import { getAlertsGrid } from '../../kiosks/actions';
import {
  getKiosksAlertsForTable,
  getTotalAlerts,
} from '../../kiosks/selectors';

const sort = [
  {
    column: 'startDate',
    direction: 'DESC',
  },
];

const Alerts = ({ getAlertsGrid, alerts }) => {
  useEffect(() => {
    getData({ sort });
  }, []);

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

  const getData = ({ sort }) => {
    const data = {
      limit: 6,
    };

    if (sort) {
      data.sort = sort;
    }
    getAlertsGrid({ data });
  };

  const handlerClickRow = ({ details }) => {
    if (details.kioskId) {
      history.push(`/kiosks/detail/${details.kioskId._id}`);
    }
  };

  return (
    <Segment>
      <SegmentHeader>
        <Header as="h4" color="red">
          <Icon name="exclamation triangle" size="small" />
          <Header.Content>Alerts</Header.Content>
        </Header>
        <div>
          <Button icon labelPosition="right" basic onClick={handleClick}>
            Show all
            <Icon name="angle right" />
          </Button>
        </div>
      </SegmentHeader>
      <CustomTable
        sortByColumn="startDate"
        onRowClick={handlerClickRow}
        sortable
        selectable
        fixed
        data={alerts}
        columns={columns}
        getData={getData}
        excludeSortBy={['status', 'duration', 'type', 'details.kioskId.name']}
        sortDirection="DESC"
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
