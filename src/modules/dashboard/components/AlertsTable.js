import React from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';
import BackLink from 'modules/shared/components/Breadcrumbs/BackLink';
import history from 'lib/history';
import Toolbar from './AlertsToolbar';

const backLink = {
  name: 'Back to Dashboard',
  link: '/',
};

const AlertsTable = ({
  alerts,
  changeDate,
  changeKiosk,
  changeAlert,
  changePage,
  getData,
  setSortByInCaller,
}) => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t('Date / Time'),
      field: 'startDate',
      formatter: ({ startDate }) => {
        let [date, time] = startDate.split(' ');
        return `${date}, ${time}`
      },
    },
    {
      title: t('Alert'),
      field: 'type',
    },
    {
      title: t('Duration'),
      field: 'duration',
    },
    {
      title: t('Kiosk'),
      field: 'details.kioskId.name',
    },
  ];
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
        <BackLink {...{ ...backLink }} />
      </SegmentHeader>
      <Toolbar
        changeDate={changeDate}
        changeKiosk={changeKiosk}
        changeAlert={changeAlert}
        changePage={changePage}
      />
      <CustomTable
        sortable
        sortByColumn="startDate"
        onRowClick={handlerClickRow}
        selectable
        excludeSortBy={['details.kioskId.name']}
        fixed
        data={alerts}
        columns={columns}
        getData={getData}
        setSortByInCaller={sort => setSortByInCaller(sort)}
      />
    </Segment>
  );
};

export default AlertsTable;
