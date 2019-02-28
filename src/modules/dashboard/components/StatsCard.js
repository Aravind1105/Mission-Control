import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';

import './statsCard.less';

const StatsCard = ({ color, icon, amount, text }) => {
  return (
    <Segment className="stats-card">
      <Header as="h1" color={color} className="stats-card-header">
        <Header.Content>{amount}</Header.Content>
        <Icon name={icon} />
        <Header.Subheader>{text}</Header.Subheader>
      </Header>
    </Segment>
  );
};

export default StatsCard;
