import { isEmpty } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon } from 'semantic-ui-react';
import history from 'lib/history';

export default ({
  dateTime,
  price,
  kioskName,
  kioskUrl,
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
  </Table.Row>
);
