import React from 'react';
import { Table } from 'semantic-ui-react';

const RankingItem = ({ rank, item, value }) => {
  return (
    <Table.Row>
      <Table.Cell>
        <strong>{rank}</strong>
      </Table.Cell>
      <Table.Cell>{item}</Table.Cell>
      <Table.Cell textAlign="right">{value}</Table.Cell>
    </Table.Row>
  );
};

export default RankingItem;
