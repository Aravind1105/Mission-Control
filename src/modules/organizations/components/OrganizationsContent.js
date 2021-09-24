import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Segment, Grid } from 'semantic-ui-react';
import get from 'lodash/get';

import history from 'lib/history';
import CustomTable from 'modules/shared/components/CustomTable';
import Loader from 'modules/shared/components/Loader';
import Pagination from 'modules/shared/components/Pagination';
import { getOrganizationsState, getOrganizationsTotal } from '../selectors';
import { getOrganizations } from '../actions';

const sortDefault = [
  {
    column: 'name',
    direction: 'ASC',
  },
];

const sortValue = {
  name: 'name',
};

const columns = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Type',
    field: 'address.0.type',
  },
  {
    title: 'Fridges',
    field: 'fridges',
  },
  {
    title: 'Address',
    field: 'address',
    formatter: ({ address }) => {
      const { city = '', line1 = '' } = get(address, '0.properties', {});
      const adr = [city, line1].filter(el => Boolean(el)).join(', ');
      return adr || 'N.A.';
    },
  },
  {
    title: 'Users',
    field: 'user',
  },
];

const OrganizationsContent = ({
  organizations,
  isLoading,
  getOrganizations,
  total,
}) => {
  const [page, changePage] = useState(0);
  const [perPage, changePerPage] = useState(25);
  const [sort, setSort] = useState(sortDefault);

  const getData = ({ sort }) => {
    const data = {
      skip: page * perPage,
      limit: perPage,
    };

    if (sort && sortValue[sort[0].column]) {
      sort[0].column = sortValue[sort[0].column];
      data.sort = sort;
    }
    getOrganizations({ data });
  };

  useEffect(() => {
    if (!isLoading) getData({ sort });
  }, [page, perPage]);

  const clickRow = ({ slug }) => {
    history.push(`detail/${slug}`);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={16}>
          <Segment>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Grid.Row>
                    <Grid.Column>
                      <CustomTable
                        columns={columns}
                        data={organizations}
                        onRowClick={clickRow}
                        sortable
                        selectable
                        sortByColumn="name"
                        setSortByInCaller={sort => setSort([sort])}
                        sortDirection="ASC"
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Pagination
                        totalCount={total}
                        page={page}
                        perPage={perPage}
                        changePage={changePage}
                        changePerPage={changePerPage}
                        isLoading={isLoading}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
};

const mapStateToProps = state => ({
  organizations: getOrganizationsState(state),
  isLoading: state.organizations.isLoading,
  total: getOrganizationsTotal(state),
});

const mapDispatchToProps = {
  getOrganizations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationsContent);
