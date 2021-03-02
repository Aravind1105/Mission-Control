import React, { useState, useEffect } from 'react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { Grid } from 'semantic-ui-react';

const DatePicker = ({ type, onChange }) => {
  const [input, setInput] = useState('');

  const handlerChange = (e, { value }) => {
    setInput(value);
  };

  useEffect(() => {
    //when both from and to dates are selected, the length will be 23
    if (input.length === 23) {
      const datesStr = input.split('-');
      onChange(
        datesStr.map(ele => {
          const split = ele.split('.');
          const date = new Date();
          date.setFullYear(split[2]);
          date.setMonth(split[1] - 1);
          date.setDate(split[0]);
          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          return date;
        }),
      );
    } else {
      onChange();
    }
  }, [input]);

  return (
    <div id="datepicker-wrapper">
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <DatesRangeInput
              dateFormat="DD.MM.YYYY"
              iconPosition="right"
              onChange={handlerChange}
              animation="glow"
              placeholder="DD.MM.YYYY"
              value={input}
              allowSameEndDate
              clearable
              closable
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
