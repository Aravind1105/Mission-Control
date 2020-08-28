import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon, Label } from 'semantic-ui-react';

import history from 'lib/history';
import ColoredBlock from '../ColoredBlock';
import './styles.less';

const AlertIcon = ({ quantity }) => (
  <div>
    <Icon
      name="bell outline"
      style={{
        fontSize: '1.5em',
      }}
    />
    <Label
      color="red"
      floating
      style={{
        fontSize: '8px',
      }}
    >
      {quantity}
    </Label>
  </div>
);

const AlertsList = ({ alerts }) => {
  const tenAlerts = useMemo(() => alerts.slice(0, 10), [alerts]);
  const handleShowAll = () => {
    history.push('/dashboard/alerts');
  };
  const handleClick = id => {
    history.push(`/kiosks/detail/${id}`);
  };
  return (
    <Dropdown
      trigger={<AlertIcon quantity={alerts.length} />}
      pointing="top right"
      scrolling
      icon={false}
    >
      <Dropdown.Menu>
        <Dropdown.Header icon="tags" content="Notification" />
        <Dropdown.Divider />
        {tenAlerts.map(({ id, title, message }) => (
          <Dropdown.Item key={id} onClick={() => handleClick(id)}>
            <ColoredBlock type="b" value={0}>
              {title}
            </ColoredBlock>
            <div>{message}</div>
          </Dropdown.Item>
        ))}
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleShowAll}>
          <div className="show-all-dropdown-btn">Show All</div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

AlertsList.propTypes = {
  alerts: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.arrayOf({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }),
  ]),
};

export default AlertsList;
