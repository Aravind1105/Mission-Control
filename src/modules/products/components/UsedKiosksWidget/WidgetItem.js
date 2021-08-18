import { isEmpty } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon } from 'semantic-ui-react';

export default ({ kiosk: { _id, name, serialNumber, cabelIds } }) => {
  const kioskUrl = `/kiosks/detail/${_id}`;
  return (
    <Table.Row textAlign="left">
      <Table.Cell className="price-history-widget-td" width="3">
        <Link to={{ pathname: kioskUrl }}>{name}</Link>
      </Table.Cell>
      <Table.Cell className="price-history-widget-td" width="4">
        {<Link to={{ pathname: kioskUrl }}>{serialNumber}</Link>}
      </Table.Cell>
      <Table.Cell className="price-history-widget-td" width="4">
        {cabelIds.map(cabelId => (
          <Link
            to={{ pathname: kioskUrl + `/${cabelId}` }}
          >{`ID: ${cabelId} `}</Link>
        ))}
      </Table.Cell>
    </Table.Row>
  );
};
