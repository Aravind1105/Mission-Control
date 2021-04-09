import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';

import Loader from 'modules/shared/components/Loader';
import './styles.less';

const sortTypes = {
  ASC: 'ascending',
  DESC: 'descending',
};

const ProductsTable = ({
  columns,
  data,
  fixed,
  headless,
  selectable,
  sortable,
  sortByColumn,
  sortDirection,
  onRowClick,
  rowLimit,
  getData,
  isLoading,
  excludeSortBy,
  setSortByInCaller,
  alignCenter,
  ...rest
}) => {
  const [tableData, setTableData] = useState([]);
  const [direction, setDirection] = useState(
    sortTypes[sortDirection.toUpperCase()],
  );
  const [sortBy, setSortBy] = useState(sortByColumn);
  const [activeRow, setActiveRow] = useState(-1);

  useEffect(() => {
    let res = data;
    if (sortBy) {
      res = getData
        ? data
        : orderBy(data, [sortBy], sortDirection.toLowerCase() || ['asc']);
      setTableData(res);
    }
    setTableData(res);
  }, [data]);

  useEffect(() => {
    setSortByInCaller({
      column: sortBy,
      direction: direction === sortTypes.ASC ? 'ASC' : 'DESC',
    });
  }, [sortBy, direction]);

  const handlerHCellClick = key => () => {
    if (excludeSortBy.includes(key)) return;
    const method =
      sortBy === key && direction === sortTypes.ASC ? 'desc' : 'asc';

    if (getData) {
      const sort = [
        {
          column: key,
          direction: method.toUpperCase(),
        },
      ];
      getData({ sort });
    } else {
      const res = orderBy(data, [key], [method]);
      setTableData(res);
    }
    setDirection(sortTypes[method.toUpperCase()]);
    setSortBy(key);
  };

  // const handlerRowClick = (item, i) => () => {
  //   if (selectable) setActiveRow(i);
  //   if (onRowClick) onRowClick(item, i);
  // };

  const resultData = rowLimit ? tableData.slice(0, rowLimit) : tableData;

  let toggleTableCellColor = true;

  return (
    <>
      {isLoading && <Loader />}
      <Table
        className="unitable"
        basic
        celled
        padded
        structured
        fixed={fixed}
        sortable={sortable}
        selectable={selectable}
        style={alignCenter && { textAlign: 'center' }}
        {...rest}
      >
        {!headless && (
          <Table.Header>
            {/* <Table.Row>
              {columns.map(({ title, field, className }) => {
                const sorted =
                  (sortBy && sortBy === field && direction) || undefined;
                const sortClass =
                  Array.isArray(excludeSortBy) &&
                  sortable &&
                  !excludeSortBy.find(elem => elem === field)
                    ? 'sortable-th'
                    : '';
                return (
                  <Table.HeaderCell
                    key={field}
                    className={`${className || ''} ${sortClass}`}
                    sorted={sorted}
                    onClick={sortable ? handlerHCellClick(field) : undefined}
                  >
                    {title}
                  </Table.HeaderCell>
                );
              })}
            </Table.Row> */}

            <Table.Row negative>
              <Table.HeaderCell rowSpan="2">Product Name</Table.HeaderCell>
              <Table.HeaderCell colSpan="2">Sold Products</Table.HeaderCell>
              <Table.HeaderCell colSpan="2">
                Replenished Products
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="2">Removed Products</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Quantity</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Value</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Quantity</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Value</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Quantity</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        )}
        <Table.Body className="tb-products">
          {resultData.length > 0 &&
            resultData.map(product => {
              const rowKey = product.productID;
              return (
                <Table.Row
                  key={rowKey}
                  active={activeRow === product.productID}
                  // onClick={handlerRowClick(item, i)}
                >
                  <Table.Cell>{product.productName}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {`${Number(product.sold || 0).toFixed(0)}`}
                  </Table.Cell>
                  <Table.Cell textAlign="right">{`${Number(
                    product.totalGrossSales || 0,
                  ).toFixed(2)}€`}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {product.refilled || 0}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {`${Number(
                      product.refilled * product.defaultPrice || 0,
                    ).toFixed(2)} €`}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {product.removed || 0}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {`${Number(
                      product.removed * product.defaultPrice || 0,
                    ).toFixed(2)}€`}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          {resultData.length === 0 && (
            <Table.Row>
              <Table.Cell>Your query returned no results.</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  );
};

ProductsTable.prototypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.string,
      formatter: PropTypes.func,
    }),
  ),
  data: PropTypes.array.isRequired,
  fixed: PropTypes.bool,
  rowLimit: PropTypes.number,
  headless: PropTypes.bool,
  selectable: PropTypes.bool,
  sortable: PropTypes.bool,
  sortByColumn: PropTypes.string,
  sortDirection: PropTypes.oneOf([sortTypes.ASC, sortTypes.DESC]),
  onRowClick: PropTypes.func,
  getData: PropTypes.func,
  isLoading: PropTypes.bool,
  excludeSortBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ProductsTable.defaultProps = {
  columns: [],
  headless: false,
  selectable: false,
  sortable: false,
  sortByColumn: '',
  sortDirection: 'ASC',
  excludeSortBy: [],
};

export default ProductsTable;
