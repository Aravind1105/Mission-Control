import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';

import Loader from 'modules/shared/components/Loader';

const sortTypes = {
  ASC: 'ascending',
  DESC: 'descending',
};

const CustomTable = ({
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
  ...rest
}) => {
  const [tableData, setTableData] = useState([]);
  const [direction, setDirection] = useState(sortTypes[sortDirection]);
  const [sortBy, setSortBy] = useState(sortByColumn);
  const [activeRow, setActiveRow] = useState(-1);

  useEffect(() => {
    if (sortBy) {
      const res = getData ? data : orderBy(data, [sortBy], ['asc']);
      setTableData(res);
    }
  }, [data]);

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

  const handlerRowClick = (item, i) => () => {
    if (selectable) setActiveRow(i);
    if (onRowClick) onRowClick(item, i);
  };

  const resultData = rowLimit ? tableData.slice(0, rowLimit) : tableData;

  return (
    <>
      {isLoading && <Loader />}
      <Table
        className="unitable"
        basic
        celled
        fixed={fixed}
        sortable={sortable}
        selectable={selectable}
        {...rest}
      >
        {!headless && (
          <Table.Header>
            <Table.Row>
              {columns.map(({ title, field }) => {
                const sorted =
                  (sortBy && sortBy === field && direction) || undefined;

                return (
                  <Table.HeaderCell
                    key={field}
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

        <Table.Body>
          {resultData.map((item, i) => {
            const rowKey = `${i}`;
            return (
              <Table.Row
                key={rowKey}
                active={activeRow === i}
                onClick={handlerRowClick(item, i)}
              >
                {columns.map(({ field, formatter }, j) => {
                  const cellKey = `${i}-${field}`;
                  const cellValue = formatter
                    ? formatter(item, j)
                    : get(item, field, '');

                  return <Table.Cell key={cellKey}>{cellValue}</Table.Cell>;
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

CustomTable.prototypes = {
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

CustomTable.defaultProps = {
  columns: [],
  headless: false,
  selectable: false,
  sortable: false,
  sortByColumn: '',
  sortDirection: 'ASC',
  excludeSortBy: [],
};

export default CustomTable;
