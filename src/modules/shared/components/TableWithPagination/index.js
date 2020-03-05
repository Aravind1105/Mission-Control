import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Pagination } from 'semantic-ui-react';

const perPage = 10;

const TableWithPagination = ({ children, list }) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(list.length / perPage);

  useEffect(() => {
    setPage(0);
  }, [list.length]);

  const handlePageChange = (e, { activePage }) => {
    setPage(activePage - 1);
  };

  const data = list.slice(page * perPage, page * perPage + perPage);
  const component = React.cloneElement(children, { data });
  return (
    <>
      {component}
      {list.length ? (
        <Container textAlign="center">
          <Pagination
            activePage={1 + page}
            totalPages={totalPages}
            firstItem={null}
            lastItem={null}
            pointing
            secondary
            onPageChange={handlePageChange}
          />
        </Container>
      ) : null}
    </>
  );
};

TableWithPagination.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.node,
};

export default TableWithPagination;
