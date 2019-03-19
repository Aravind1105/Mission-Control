import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Pagination, Container } from 'semantic-ui-react';
import { UniTable } from 'modules/shared/components/unitable';
import { organizationsTableMockData } from '../mocks/organziationsMocks';

const tableConfig = {
  headless: false,
  enumerated: true,
  striped: true,
  selectable: true,
  sortation: 'name',
  sorting: 'ascending',
  clickArg: ['id'],
};

const tableColumns = [
  {
    name: 'id',
    label: '',
    unit: '',
    width: 0,
    align: '',
  },
  {
    name: 'name',
    label: 'Name',
    unit: '',
    width: 40,
    align: 'left',
  },
  {
    name: 'type',
    label: 'Type',
    unit: '',
    width: 10,
    align: 'left',
  },
  {
    name: 'fridges',
    label: 'Fridges',
    unit: '',
    width: 10,
    align: 'center',
  },
  {
    name: 'address',
    label: 'Address',
    unit: '',
    width: 30,
    align: 'left',
  },
  {
    name: 'users',
    label: 'Users',
    unit: '',
    width: 10,
    align: 'center',
  },
];

const filters = [];
const infos = [];

const OrganizationsContent = ({ history }) => {
  const clickRow = id => {
    console.log('I: ', id);
    history.push(`organizations/organization/${id}`);
  };

  return (
    <Segment>
      <UniTable
        tableConfig={tableConfig}
        tableColumns={tableColumns}
        tableData={organizationsTableMockData}
        filters={filters}
        infos={infos}
        onClickRow={args => clickRow(args)}
      />
      <Container textAlign="center">
        <Pagination
          style={{ marginTop: '10px' }}
          defaultActivePage={1}
          boundaryRange={0}
          onPageChange={null}
          size="mini"
          siblingRange={1}
          totalPages={1}
        />
      </Container>
    </Segment>
  );
};

export default withRouter(connect()(OrganizationsContent));
