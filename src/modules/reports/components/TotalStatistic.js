import React from 'react';
import { Segment, Progress } from 'semantic-ui-react';

const TotalStatistic = ({ title, value, color, ...rest }) => (
  <Segment className="progress-bar" {...rest}>
    <div className="progress-bar__statistic">
      <div className="progress-bar__value" style={{ color }}>
        {`${value} %`}
      </div>
      <Progress percent={value} size="tiny" color={color} />
    </div>
    <div>{title}</div>
  </Segment>
);

export default TotalStatistic;
