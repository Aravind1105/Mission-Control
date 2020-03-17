import React from 'react';
import { Segment, Container, Pagination } from 'semantic-ui-react';
import {
  Unitable,
  valueEquals,
  conditionalValue,
} from '../../shared/components/unitableReloaded';
import { genProductsListMock } from '../mocks/productsMock';

const productsList = genProductsListMock(20);

const ProductsContent = () => {
  const columns = [
    {
      name: 'Name',
    },
    {
      name: 'Supplier',
    },
    {
      name: 'Category',
    },
    {
      name: 'Weight',
      postfix: ' g',
    },
    {
      name: 'Price',
      postfix: ' €',
    },
    {
      name: 'Cost',
      postfix: ' €',
    },
    {
      name: 'Margin',
      postfix: ' %',
    },
  ];

  return (
    <Segment>
      <Unitable
        data={productsList}
        columns={columns}
        // onRowClick={clickRow}
        // clickArgs={['id']}
        sortable
        selectable
        sortByColumn="name"
      />
      {true && (
        <Container textAlign="center">
          <Pagination
            style={{ marginTop: '10px' }}
            defaultActivePage={1}
            boundaryRange={0}
            onPageChange={null}
            size="mini"
            siblingRange={1}
            totalPages={1}
          />
        </Container>
      )}
    </Segment>
  );
};

export default ProductsContent;
