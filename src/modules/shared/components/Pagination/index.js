import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Container,
  Select,
  Pagination as SemanticPagination,
} from 'semantic-ui-react';

import './styles.less';

const pageOptions = [10, 25, 50, 100].map(value => ({
  key: `${value}`,
  value,
  text: `${value} per page`,
}));
const prevItem = { content: <Icon name="angle left" />, icon: true };
const nextItem = { content: <Icon name="angle right" />, icon: true };

const Pagination = ({
  totalCount,
  page,
  perPage,
  isLoading,
  changePage,
  changePerPage,
  setFontSize
}) => {
  const totalPages = Math.ceil(totalCount / perPage);
  const handlerPageChange = (e, { activePage }) => {
    if (!isLoading) {
      changePage(activePage - 1);
    }
  };
  const handlerPerPageChange = (e, { value }) => {
    const isChanged = value !== perPage;

    if (!isLoading && isChanged) {
      changePerPage(value);
      changePage(0);
    }
  };
  let size;
  if (perPage === 25)
    size = "0.67rem"
  else if (perPage === 10)
    size = "0.57rem"

  return totalCount ? (
    <Container textAlign="center">
      <SemanticPagination
        size="mini"
        activePage={1 + page}
        totalPages={totalPages}
        firstItem={null}
        lastItem={null}
        prevItem={prevItem}
        nextItem={nextItem}
        onPageChange={handlerPageChange}
        style={setFontSize && { fontSize: size }}

      />
      <div className="perpage-container">
        <Select
          id="perpage"
          options={pageOptions}
          value={perPage}
          onChange={handlerPerPageChange}
        />
      </div>
    </Container>
  ) : null;
};

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default Pagination;
