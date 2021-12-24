import React, { useState, useEffect } from 'react';
import { Grid, Form } from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import moment from 'moment';
import './styles.less';

const DatePicker = ({ type, onChange, value }) => {
  const [input, setInput] = useState(value);
  const width = window.innerWidth;
  const handlerChange = (e, { value }) => {
    setInput(value);
  };
  useEffect(() => {
    if (input && input.length === 13) {
      const datesStr = input.split('-');
      const split = datesStr[0].split('.');
      const date = new Date();
      date.setFullYear(split[2]);
      date.setMonth(split[1] - 1);
      date.setDate(split[0]);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      onChange([date]);
    } else if (input && input.length === 23) {
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
      onChange(input);
    }
  }, [input]);

  if (width < 600) {
    if (Array.isArray(input) && input.length == 2) {
      setInput(
        `${moment(input[0]).format('DD.MM.YYYY')} - ${moment(input[1]).format(
          'DD.MM.YYYY',
        )}`,
      );
    }
    return (
      <div id="datepicker-wrapper">
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <DatesRangeInput
                  dateFormat="DD.MM.YYYY"
                  iconPosition="right"
                  onChange={handlerChange}
                  animation="glow"
                  placeholder="DD.MM.YYYY -  DD.MM.YYYY"
                  value={input}
                  allowSameEndDate
                  clearable
                  closable
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </div>
    );
  } else {
    return (
      <div id="datepicker-wrapper">
        <SemanticDatepicker
          format="DD.MM.YYYY"
          className="test"
          id="datepicker-input"
          placeholder="DD.MM.YYYY -  DD.MM.YYYY"
          type={type}
          value={input}
          onChange={handlerChange}
        />
      </div>
    );
  }
};

DatePicker.defaultProps = {
  type: 'basic',
};

export default DatePicker;
