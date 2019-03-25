import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { ascend, descend, prop, sortWith, pick } from 'ramda';
import UnitableHeaderCell from './UnitableHeaderCell';
import UnitableCellContent from './UnitableCellContent';
import UnitableCellProgress from './UnitableCellProgress';

const ASC = 'ascending';
const DESC = 'descending';

const sortData = (column, direction) =>
  direction === DESC
    ? sortWith([descend(prop(column))])
    : sortWith([ascend(prop(column))]);

const applySorting = (
  data,
  column,
  direction,
  { setActiveColumn, setTableData, setDirection },
) => {
  setActiveColumn(column);
  setTableData(sortData(column, direction)(data));
  setDirection(direction);
};

const Unitable = ({
  columns,
  data,
  headless,
  selectable,
  sortable,
  sortByColumn,
  sortDirection,
  onRowClick,
}) => {
  const [activeColumn, setActiveColumn] = useState('');
  const [direction, setDirection] = useState('ascending');
  const [tableData, setTableData] = useState([]);
  const [activeRow, setActiveRow] = useState(-1);

  const handleSort = clickedColumn => () => {
    if (!sortable) return;

    if (activeColumn !== clickedColumn) {
      return applySorting(data, clickedColumn, ASC, {
        setActiveColumn,
        setTableData,
        setDirection,
      });
    }

    setTableData(tableData.reverse());
    setDirection(direction === ASC ? DESC : ASC);
  };

  useEffect(() => {
    if (sortByColumn) {
      return applySorting(data, sortByColumn, sortDirection, {
        setActiveColumn,
        setTableData,
        setDirection,
      });
    }

    setTableData(data);
  }, [data]);

  useEffect(() => {
    selectable && setActiveRow(0);
  }, []);

  return (
    <Table
      sortable={sortable}
      celled
      className="unitable"
      basic="very"
      selectable={selectable}
    >
      {!headless && (
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <UnitableHeaderCell
                {...column}
                key={column.name}
                activeColumn={activeColumn}
                sortDirection={direction}
                handleSort={handleSort}
              />
            ))}
          </Table.Row>
        </Table.Header>
      )}
      <Table.Body>
        {Object.keys(tableData).map((key, index) => {
          return (
            <Table.Row
              key={key}
              active={activeRow === index}
              onClick={() => {
                selectable && setActiveRow(index);
                onRowClick(pick(['id'], tableData[key]));
              }}
            >
              {columns.map(
                ({
                  icon,
                  type,
                  name,
                  mapDataFrom,
                  postfix,
                  positive,
                  textAlign,
                  negative,
                  warning,
                }) => {
                  const value =
                    tableData[key][mapDataFrom || name.toLowerCase()];

                  return (
                    <Table.Cell
                      key={name.toLowerCase()}
                      positive={positive && positive(value)}
                      negative={negative && negative(value)}
                      warning={warning && warning(value)}
                      textAlign={textAlign}
                      className={type ? type : ''}
                    >
                      {type === 'progress' && (
                        <UnitableCellProgress
                          value={
                            tableData[key][mapDataFrom || name.toLowerCase()]
                          }
                        />
                      )}
                      {!type && (
                        <UnitableCellContent
                          icon={icon}
                          value={
                            tableData[key][mapDataFrom || name.toLowerCase()]
                          }
                          postfix={postfix}
                          textAlign={textAlign}
                        />
                      )}
                    </Table.Cell>
                  );
                },
              )}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

Unitable.prototypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      name: PropTypes.string,
      negative: PropTypes.func,
      mapDataFrom: PropTypes.string,
      postfix: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      positive: PropTypes.func,
      progress: PropTypes.arrayOf['progress'],
    }),
  ),
  data: PropTypes.array.isRequired,
  headless: PropTypes.bool,
  selectable: PropTypes.bool,
  sortable: PropTypes.bool,
  sortByColumn: PropTypes.string,
  sortDirection: PropTypes.oneOf([ASC, DESC]),
  onRowClick: PropTypes.func,
  clickArgs: PropTypes.arrayOf(PropTypes.string),
};

Unitable.defaultProps = {
  columns: [],
  headless: false,
  selectable: false,
  sortable: false,
  sortByColumn: null,
  sortDirection: ASC,
  onRowClick: () => {},
  clickArgs: [],
};

export default Unitable;
