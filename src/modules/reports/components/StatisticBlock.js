import React from 'react';
import { Item } from 'semantic-ui-react';

const StatisticBlock = ({ title, value, description, icon }) => (
  <Item.Group>
    <Item>
      {icon ? icon() : null}
      <Item.Content verticalAlign="middle">
        <Item.Extra>{title}</Item.Extra>
        <div>{value}</div>
        <Item.Meta>{description}</Item.Meta>
      </Item.Content>
    </Item>
  </Item.Group>
);

export default StatisticBlock;
