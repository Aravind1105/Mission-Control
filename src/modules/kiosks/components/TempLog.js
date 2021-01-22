import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';
import CustomTable from 'modules/shared/components/CustomTable';
import { getTemperatureLogsState } from '../selectors';

const sort = [
  {
    column: 'date',
    direction: 'DESC',
  },
];

const columns = [
  {
    title: 'Date',
    field: 'date',
  },
  {
    title: 'Average',
    field: 'avgTemp',
  },
  {
    title: 'Minimum',
    field: 'minTemp',
  },
  {
    title: 'Maximum',
    field: 'maxTemp',
  },
];

const TempLogGrid = ({ temperatureLogs }) => {
  return (
    <Grid.Row>
      <Grid.Column>
        <Segment>
          <CustomTable
            sortByColumn="date"
            sortable
            fixed
            data={temperatureLogs}
            columns={columns}
            // excludeSortBy={['details.kioskId.name']}
            sortDirection="DESC"
          />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
};

const mapStateToProps = state => ({
  temperatureLogs: getTemperatureLogsState(state),
});

export default connect(mapStateToProps)(TempLogGrid);
