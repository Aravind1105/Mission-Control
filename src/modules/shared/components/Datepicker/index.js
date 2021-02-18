import React from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Grid } from 'semantic-ui-react';
import './styles.less';

const DatePicker = ({ type, onChange }) => {
  const handlerChange = (e, { value }) => {
    if (onChange) onChange(value);
  };

  return (
    <div id="datepicker-wrapper">
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <SemanticDatepicker
              format="DD.MM.YYYY"
              className="test"
              id="datepicker-input"
              type={type}
              onChange={handlerChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

DatePicker.defaultProps = {
  type: 'basic',
};

export default DatePicker;
