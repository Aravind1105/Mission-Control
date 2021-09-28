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

const SalesTable = ({
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
  // const [activeRow, setActiveRow] = useState(-1);

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
    <div style={{ overflow: 'auto', borderRadius: '2px' }}>
      {isLoading && <Loader />}
      <Table
        className="unitable transactions-table"
        basic
        celled
        unstackable
        padded
        structured
        fixed={fixed}
        sortable={sortable}
        style={alignCenter && { textAlign: 'center' }}
        {...rest}
      >
        {!headless && (
          <Table.Header>
            <Table.Row className="table-row-header">
              {columns.map(({ title, field, className }) => {
                const sorted =
                  (sortBy && sortBy === field && direction) || undefined;
                const sortClass =
                  Array.isArray(excludeSortBy) &&
                  sortable &&
                  !excludeSortBy.find(elem => elem === field)
                    ? 'sortable-transaction-header'
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
            </Table.Row>
          </Table.Header>
        )}
        {resultData.map((resultItem, rowIdx) => (
          <Table.Body
            className="tb-sales"
            // className={activeRow === rowIdx ? 'active-body' : ''}
          >
            {resultItem.map((item, i) => {
              const rowKey = `${i}`;
              if (item.transactionID) {
                toggleTableCellColor = !toggleTableCellColor;
              }
              return (
                <Table.Row
                  key={rowKey}
                  // onClick={handlerRowClick(resultItem, rowIdx)}
                >
                  {columns.map(({ field, formatter }, j) => {
                    const cellKey = `${i}-${field}`;
                    const cellValue = formatter
                      ? formatter(item, j)
                      : get(item, field, '');
                    const isOnlyRootField =
                      field === 'transactionID' ||
                      field === 'kioskName' ||
                      field === 'created' ||
                      field === 'paymentMethod';
                    if (!item.transactionID && isOnlyRootField) {
                      return;
                    }
                    // eslint-disable-next-line consistent-return
                    return (
                      <Table.Cell
                        key={cellKey}
                        // eslint-disable-next-line no-nested-ternary
                        rowSpan={
                          item.transactionID && isOnlyRootField
                            ? item.uniqueProducts === 1
                              ? 1
                              : item.uniqueProducts + 1
                            : '1'
                        }
                        className={`table-cell-text ${
                          item.transactionID
                            ? 'table-cell-text-transaction'
                            : ''
                        } ${
                          toggleTableCellColor
                            ? 'table-cell-bg-grey'
                            : 'table-cell-bg-white'
                        }`}
                      >
                        {cellValue}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>
        ))}
      </Table>
    </div>
  );
};

SalesTable.prototypes = {
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

SalesTable.defaultProps = {
  columns: [],
  headless: false,
  selectable: false,
  sortable: false,
  sortByColumn: '',
  sortDirection: 'ASC',
  excludeSortBy: [],
};

export default SalesTable;
