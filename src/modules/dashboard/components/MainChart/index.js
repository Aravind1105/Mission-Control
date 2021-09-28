import React, { useState, useEffect } from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';
import Select from 'react-select';
import { connect } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { isEmpty } from 'lodash';

import { colorsArr } from 'lib/colors';
import CustomizedAxisTick from '../CustomizedAxisTick';
import CustomTooltip from '../CustomTooltip';
import { getSalesStatisticState } from '../../selectors';
import { computeAndFormatData } from '../../sagas/formatData';
import './styles.less';
import SelectCheckBoxes from '../../../shared/components/SelectCheckBoxes';

const optionsTime = [
  { label: 'Hourly', value: 'hourly' },
  //{ label: 'Minutely', value: 'minutely' },
  { label: 'Last 24 Hours', value: 'last24Hours' },
  { label: 'Weekly', value: 'weekDays' },
  { label: 'Last 7 Days', value: 'last7Days' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Last 30 Days', value: 'last30Days' },
];

const MainChart = ({ kiosksOptions, salesStats, isKiosksListLoading }) => {
  const [kioskId, setKiosk] = useState([]);
  const [time, setTime] = useState(optionsTime[3].value);
  const [data, setData] = useState(salesStats[time]);
  const [kiosks, setKiosks] = useState([]);

  useEffect(() => {
    const { kioskNames, formattedData } = computeAndFormatData(
      time,
      salesStats[time],
      kioskId,
    );
    setKiosks(kioskNames);
    setData(formattedData);
  }, [kioskId, time]);

  const handleKioskChange = value => {
    setKiosk(value);
  };

  const handleChangeTime = ({ value }) => {
    setTime(value);
  };

  return (
    <Segment>
      <Grid stackable verticalAlign="middle" className="dashboard-header">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h4" color="black">
              <Header.Content>Sales by Fridges</Header.Content>
            </Header>
          </Grid.Column>

          <Grid.Column mobile={16} computer={4}>
            <SelectCheckBoxes
              title="Kiosks"
              options={kiosksOptions}
              allOptionKey=""
              onClickApply={handleKioskChange}
              isLoading={isKiosksListLoading}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={4}>
            <Select
              onChange={handleChangeTime}
              options={optionsTime}
              defaultValue={optionsTime[3]}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {isEmpty(kiosks) && (
        <div className="chart-empty-data">
          <p>
            There's currently no data available for the parameters selected.
          </p>
          <p>Please try a different combination.</p>
        </div>
      )}
      {!isEmpty(kiosks) && (
        <div className="chart-data">
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                XAxis
                dataKey="date"
                height={60}
                interval={0}
                tickSize={10}
                tick={<CustomizedAxisTick />}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  left: 20,
                  right: 25,
                }}
              />

              {kiosks.map((kiosk, i) => (
                <Bar
                  key={kiosk}
                  dataKey={kiosk}
                  name={kiosk}
                  stackId="a"
                  fill={colorsArr[i % (colorsArr.length - 1)]}
                  className="chartTest"
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Segment>
  );
};

const mapStateToProps = state => ({
  salesStats: getSalesStatisticState(state),
  isKiosksListLoading: state.kiosks.isKiosksListLoading,
});

export default connect(mapStateToProps)(MainChart);
