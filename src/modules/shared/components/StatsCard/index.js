import React, { useState, useEffect } from 'react';
import { Header, Icon, Segment, Grid, Popup } from 'semantic-ui-react';

import './statsCard.less';

const StatsCard = ({
  icon,
  customColor,
  amount,
  text,
  popup,
  secondaryText,
  fontTo18,
}) => {
  const [largeTxt, isLargeTxt] = useState(false);

  useEffect(() => {
    if (amount.length > 20) isLargeTxt(true);
    else isLargeTxt(false);
  }, [amount]);

  return (
    <Segment
      className="stats-card"
      style={{ borderBottom: `3px solid ${customColor}` }}
    >
      <Header
        as="h1"
        style={{ color: customColor }}
        className="stats-card-header"
      >
        <Grid.Column className="column-left">
          <Grid.Row className="stats-row">
            <Header.Subheader className="sub-header">{text}</Header.Subheader>
          </Grid.Row>
          <Grid.Row className="stats-row">
            {popup && largeTxt ? (
              <Popup
                trigger={
                  <Header.Content
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      width: '140px',
                      whiteSpace: 'nowrap',
                      fontSize: fontTo18 ? '18px' : '28px',
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
                  fontSize: fontTo18 ? '18px' : '28px',
                }}
              >
                {amount}
              </Header.Content>
            )}
            {icon && (
              <Icon
                name={icon}
                className="kpi-icons"
                size="large"
                style={{
                  fontSize: '1.1em',
                  marginTop: secondaryText && '10px',
                }}
              />
            )}
            {secondaryText && (
              <Header.Subheader style={{ marginBottom: '5px' }}>
                {secondaryText}
              </Header.Subheader>
            )}
          </Grid.Row>
        </Grid.Column>
      </Header>
    </Segment>
  );
};

export default StatsCard;
