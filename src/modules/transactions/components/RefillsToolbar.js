import React from 'react';
import { func, arrayOf, object } from 'prop-types';
import { Segment, Grid, Dropdown } from 'semantic-ui-react';
import format from 'date-fns/format';

import DatePicker from 'modules/shared/components/Datepicker';

// const stateOptions = [
//   { key: '', value: '', text: 'All' },
//   { key: 'Added', value: 'Added', text: 'Added' },
//   { key: 'Removed', value: 'Removed', text: 'Removed' },
// ];

const Toolbar = ({
  kiosks,
  changeDate,
  changePage,
  changeKiosk,
  productsList,
  changeProduct,
}) => {
  const handleDateChange = value => {
    let date = '';
    if (value) {
      date = value.reduce((prev, curr, i) => {
        const key = i % 2 ? '$lte' : '$gte';
        prev[key] =
          i % 2
            ? `${format(curr, 'yyyy-MM-dd')}T23:59:59.999Z`
            : `${format(curr, 'yyyy-MM-dd')}T00:00:00.000Z`;
        return prev;
      }, {});
    }
    changePage(0);
    changeDate(date);
  };

  const handleKioskChange = (e, { value }) => {
    changeKiosk(value);
  };

  const handleProductChange = (e, { value }) => {
    changeProduct(value);
  };

  return (
    <Segment className="toolbar">
      <Grid>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={4}>
            <DatePicker type="range" onChange={handleDateChange} />
          </Grid.Column>

          <Grid.Column width={4}>
            <Dropdown
              placeholder="Kiosk"
              selection
              options={kiosks}
              className="full-width"
              onChange={handleKioskChange}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Dropdown
              placeholder="Product"
              selection
              className="full-width"
              options={productsList}
              onChange={handleProductChange}
            />
          </Grid.Column>
          {/* <Grid.Column width={4}>
            <Dropdown
              placeholder="Added & Removed"
              selection
              options={stateOptions}
              className="full-width"
            />
          </Grid.Column> */}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

Toolbar.propTypes = {
  changeDate: func,
  changePage: func,
  changeKiosk: func,
  kiosks: arrayOf(object),
};

export default Toolbar;
