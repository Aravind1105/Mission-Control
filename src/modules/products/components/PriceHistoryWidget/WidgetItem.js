import { isEmpty } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon } from 'semantic-ui-react';
import history from 'lib/history';

export default ({
  priceHistoryId,
  dateTime,
  price,
  kioskName,
  kioskUrl,
  showDelete,
  onClickDelete,
}) => (
  <Table.Row>
    <Table.Cell className="price-history-widged-td" width="5">
      {dateTime}
    </Table.Cell>
    <Table.Cell className="price-history-widged-td" width="2">
      {price !== 'Default' ? `${price} €` : 'Default'}
    </Table.Cell>
    <Table.Cell className="price-history-widged-td" width="3">
      {!isEmpty(kioskUrl) ? (
        <Link to={{ pathname: kioskUrl }}>{kioskName}</Link>
      ) : (
        kioskName
      )}
    </Table.Cell>
    {showDelete && (
      <Table.Cell className="price-history-widged-td" width="1">
        <Icon
          name="delete"
          color="red"
          className="widget-item-icon"
          onClick={onClickDelete}
        />
      </Table.Cell>
    )}
  </Table.Row>
);
