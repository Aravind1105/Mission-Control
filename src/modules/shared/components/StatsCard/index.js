import React from 'react';
import { Header, Icon, Segment, Grid, Divider, Card } from 'semantic-ui-react';

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
    <>
      <Card
        // className="stats-card"
        style={{
          color: color,
          // minWidth: 205,
          borderBottom: '3px solid  ',
          // marginLeft: 5,
          // marginRight: 20,
        }}
      >
        {/* <Header
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
      </Header> */}

        <Card.Content>
          <Card.Meta>{text}</Card.Meta>
          <br></br>

          {!icon ? (
            <Grid.Column>
              {/* <Grid.Row></Grid.Row> */}
              <h2>{amount}</h2>
            </Grid.Column>
          ) : (
            <Grid>
              {/* <Grid.Row></Grid.Row> */}
              <Grid.Row columns={2}>
                <Grid.Column width={10}>
                  {/* <Header as="h2" color={color}>
                    {amount}
                  </Header> */}
                  <h2>{amount}</h2>
                </Grid.Column>
                <Grid.Column width={6}>
                  {/* <Header as="h3" color={color}>
                    <Icon name={icon} size="small" />
                  </Header> */}
                  <Icon name={icon} size="large" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
          {/* <Grid>
            <Grid.Row></Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Header as="h2" color={color}>
                  {amount}
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as="h3" color={color}>
                  <Icon name={icon} size="small" />
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid> */}
        </Card.Content>
      </Card>
    </>
  );
};

export default StatsCard;
