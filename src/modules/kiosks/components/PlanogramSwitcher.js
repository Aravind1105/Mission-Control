import React from 'react';
import { Menu, Grid } from 'semantic-ui-react';

const menuStyle = {
  marginBottom: '2rem',
};

const menuItemStyle = {
  fontWeight: 'bold',
  fontSize: 18,
  padding: 5,
};

const PlanogramSwitcher = ({
  activeShelves,
  setCurrentSide,
  currentSide,
  isTwoSides,
}) => {
  const handleClick = (e, { value }) => {
    setCurrentSide(value);
  };
  return (
    <>
      <Menu tabular attached="top" style={menuStyle}>
        <Menu.Item name="Planogram" value="Planogram" style={menuItemStyle} />
        {isTwoSides && (
          <>
            <Menu.Item
              name="Left Kiosk"
              onClick={handleClick}
              value="B"
              active={currentSide === 'B'}
            />
            <Menu.Item
              name="Right Kiosk"
              onClick={handleClick}
              value="A"
              active={currentSide === 'A'}
            />
          </>
        )}
        <Menu.Menu position="right">
          <Menu.Item>
            <Grid.Column width={6} className="text-align-right">
              Active scales:
              <b className="textGreen">{` ${activeShelves}/${
                isTwoSides ? 30 : 15
              }`}</b>
            </Grid.Column>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default PlanogramSwitcher;
