import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Dropdown } from 'semantic-ui-react';

import SearchInput from 'modules/shared/components/SearchInput';
import DatePicker from 'modules/shared/components/Datepicker';

const stateOptions = [
  { key: 'client', value: 'client', text: 'client' },
  { key: 'license', value: 'license', text: 'license' },
];

const Toolbar = ({ changeSearch, changeDate, changePage }) => {
  const handleDateChange = value => {
    let date = '';
    if (value) {
      date = value.reduce((prev, curr, i) => {
        const key = i % 2 ? '$lte' : '$gte';
        prev[key] = curr.toISOString();
        return prev;
      }, {});
    }
    changePage(0);
    changeDate(date);
  };

  return (
    <Segment className="toolbar">
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={4}>
            <DatePicker type="range" onChange={handleDateChange} />
          </Grid.Column>

          <Grid.Column width={4}>
            <SearchInput onChange={changeSearch} timeout={500} />
          </Grid.Column>

          <Grid.Column width={4}>
            <Dropdown
              placeholder="All types"
              selection
              options={stateOptions}
              className="full-width"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

Toolbar.propTypes = {
  changeSearch: PropTypes.func,
  changeDate: PropTypes.func,
  changePage: PropTypes.func,
};

export default Toolbar;
