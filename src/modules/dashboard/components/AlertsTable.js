import React from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import SegmentHeader from 'modules/shared/components/SegmentHeader';
import CustomTable from 'modules/shared/components/CustomTable';
import BackLink from 'modules/shared/components/Breadcrumbs/BackLink';
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
}) => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t('Date / Time'),
      field: 'startDate',
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
        excludeSortBy={['details.kioskId.name']}
        fixed
        data={alerts}
        columns={columns}
        getData={getData}
      />
    </Segment>
  );
};

export default AlertsTable;
