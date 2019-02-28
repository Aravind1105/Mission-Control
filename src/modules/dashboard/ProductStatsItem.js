import React from 'react';
import { Table } from 'semantic-ui-react';

const ProductItemStats = ({ name, invAmount, sales, sold, margin }) => {
  return (
    <Table.Row>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{invAmount}</Table.Cell>
      <Table.Cell>{`€ ${sales}`}</Table.Cell>
      <Table.Cell>{sold}</Table.Cell>
      <Table.Cell>{margin}</Table.Cell>
    </Table.Row>
  );
};

export default ProductItemStats;
