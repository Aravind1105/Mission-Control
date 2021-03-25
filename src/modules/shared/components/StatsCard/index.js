import React from 'react';
import { Header, Icon, Segment, Grid } from 'semantic-ui-react';

import './statsCard.less';

const StatsCard = ({
  color,
  icon,
  amount,
  text,
  secondaryText,
  secondaryAmount,
}) => {
  const isDoubleDeck = secondaryText || secondaryAmount;
  return (
    <Segment className="stats-card">
      <Header
        as="h1"
        color={color}
        className={
          isDoubleDeck ? 'stats-card-header-double' : 'stats-card-header'
        }
      >
        <Grid.Column className="column-left">
          <Grid.Row>
            <Header.Subheader>{text}</Header.Subheader>
          </Grid.Row>
          <Grid.Row>
            <Header.Content>{amount}</Header.Content>
          </Grid.Row>
          {isDoubleDeck && (
            <>
              <Grid.Row className="lower-deck">
                <Header.Subheader>{secondaryText}</Header.Subheader>
              </Grid.Row>
              <Grid.Row>
                <Header.Content>{secondaryAmount}</Header.Content>
              </Grid.Row>
            </>
          )}
        </Grid.Column>
        <Grid.Column className="column-right">
          <Icon name={icon} size="large" />
        </Grid.Column>
      </Header>
    </Segment>
  );
};

export default StatsCard;
