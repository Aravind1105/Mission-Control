import React, { useState, useEffect } from 'react';
import { Header, Icon, Segment, Grid, Popup } from 'semantic-ui-react';

import './statsCard.less';

const StatsCard = ({
  icon,
  customColor,
  amount,
  text,
  padding,
  popup,
  secondaryText,
  secondaryAmount,
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
          <Grid.Row>
            <Header.Subheader className="sub-header">{text}</Header.Subheader>
          </Grid.Row>
          <Grid.Row style={padding && { paddingTop: '20px' }}>
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

            <Icon
              name={icon}
              className="kpi-icons"
              size="large"
              style={{ fontSize: '28px' }}
            />
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
      </Header>
    </Segment>
  );
};

export default StatsCard;
