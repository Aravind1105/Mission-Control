import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon } from 'semantic-ui-react';

export default ({ dateTime, price, kioskName, kioskUrl, showDelete }) => (
  <Table.Row>
    <Table.Cell className="price-history-widged-td" width="5">
      {dateTime}
    </Table.Cell>
    <Table.Cell className="price-history-widged-td" width="2">
      {price !== 'Default' ? `€ ${price}` : 'Default'}
    </Table.Cell>
    <Table.Cell className="price-history-widged-td" width="3">
      {kioskUrl !== undefined ? (
        <Link to={{ pathname: kioskUrl }}>{kioskName}</Link>
      ) : (
        'Default'
      )}
    </Table.Cell>
    {showDelete && (
      <Table.Cell className="price-history-widged-td" width="1">
        <Icon
          name="delete"
          color="red"
          className="widget-item-icon"
          onClick={() => {}}
        />
      </Table.Cell>
    )}
  </Table.Row>
);
