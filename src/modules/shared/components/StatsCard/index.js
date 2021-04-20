import React, { useState, useEffect } from 'react';
import { Header, Icon, Segment, Grid, Popup } from 'semantic-ui-react';

import './statsCard.less';

const StatsCard = ({
  color,
  icon,
  customColor,
  amount,
  text,
  padding,
  popup,
  secondaryText,
  secondaryAmount,
  multipleWidgets,
}) => {
  const isDoubleDeck = secondaryText || secondaryAmount;
  const [largeTxt, isLargeTxt] = useState(false);

  useEffect(() => {
    if (amount.length > 13) isLargeTxt(true);
    else isLargeTxt(false);
  }, [amount]);

  return (
    <Segment
      className="stats-card"
      style={
        customColor && {
          borderBottom: `3px solid ${customColor}`,
        }
      }
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
            <Header.Subheader className="sub-header">{text}</Header.Subheader>
          </Grid.Row>
          <Grid.Row style={padding && { paddingTop: '30px' }}>
            {popup && largeTxt ? (
              <Popup
                trigger={
                  <Header.Content
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      width: '130px',
                      whiteSpace: 'nowrap',
                      fontSize: '22px',
                    }}
                  >
                    {amount}
                  </Header.Content>
                }
                position="top left"
                wide
                hoverable
              >
                {amount}
              </Popup>
            ) : (
              <Header.Content
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  width: '100px',
                  whiteSpace: 'nowrap',
                  fontSize: '22px',
                }}
              >
                {amount}
              </Header.Content>
            )}
          </Grid.Row>
          {secondaryText && (
            <Header.Subheader className="sub-header">
              {secondaryText}
            </Header.Subheader>
          )}
          {secondaryAmount && (
            <Header.Content>{secondaryAmount}</Header.Content>
          )}
        </Grid.Column>
        <Grid.Column
          className="column-right"
          style={padding && { paddingTop: '30px' }}
        >
          <Icon
            name={icon}
            size="large"
            style={multipleWidgets && { fontSize: '1.2em' }}
          />
        </Grid.Column>
      </Header>
    </Segment>
  );
};

export default StatsCard;
