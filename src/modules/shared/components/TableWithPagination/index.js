import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Pagination from '../Pagination';

const TableWithPagination = ({ children, list, ...rest }) => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(rest.perPage);

  useEffect(() => {
    setPage(0);
  }, [list.length]);

  const handlePageChange = activePage => {
    setPage(activePage);
  };

  const data = list.slice(page * perPage, page * perPage + perPage);
  const component = React.cloneElement(children, { data });
  return (
    <>
      {component}
      <Pagination
        totalCount={list.length}
        page={page}
        perPage={perPage}
        changePage={handlePageChange}
        changePerPage={setPerPage}
      />
    </>
  );
};

TableWithPagination.propTypes = {
  perPage: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.node,
};

TableWithPagination.defaultProps = {
  perPage: 25,
};

export default TableWithPagination;
