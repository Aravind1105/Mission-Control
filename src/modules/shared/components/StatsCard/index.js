import React from 'react';
import { Header, Icon, Segment, Grid } from 'semantic-ui-react';

import './statsCard.less';

const StatsCard = ({
  color,
  icon,
  customColor,
  amount,
  text,
  padding,
  secondaryText,
  secondaryAmount,
}) => {
  const isDoubleDeck = secondaryText || secondaryAmount;
  return (
    <Segment
      className="stats-card"
      style={customColor && { borderBottom: `3px solid ${customColor}` }}
    >
      <Header
        as="h1"
        style={
          customColor && {
            color: customColor,
          }
        }
        color={color && color}
        className={
          isDoubleDeck ? 'stats-card-header-double' : 'stats-card-header'
        }
      >
        <Grid.Column className="column-left">
          <Grid.Row>
            <Header.Subheader>{text}</Header.Subheader>
          </Grid.Row>
          <Grid.Row style={padding && { paddingTop: '30px' }}>
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
        <Grid.Column
          className="column-right"
          style={padding && { paddingTop: '30px' }}
        >
          <Icon name={icon} size="large" />
        </Grid.Column>
      </Header>
    </Segment>
  );
};

export default StatsCard;
