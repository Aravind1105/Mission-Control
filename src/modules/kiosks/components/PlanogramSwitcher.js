import React from 'react';
import { Menu, Grid } from 'semantic-ui-react';

const menuStyle = {
  marginBottom: '2rem',
  justifyContent: 'space-between',
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
    console.log('isTwoSides', isTwoSides, '\nactiveShelves: ', activeShelves);
  };
  return (
    <div>
      <Menu stackable tabular attached="top" style={menuStyle}>
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
        <Menu.Menu stackable position="right">
          <Menu.Item>
            <Grid.Column width={4} className="text-align-right">
              Active scales:
              <b className="textGreen">{` ${activeShelves}/${
                isTwoSides ? 30 : 15
              }`}</b>
            </Grid.Column>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default PlanogramSwitcher;
