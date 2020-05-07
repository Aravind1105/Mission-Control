import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { ascend, descend, prop, sortWith, pick } from 'ramda';
import UnitableHeaderCell from './UnitableHeaderCell';
import UnitableCellContent from './UnitableCellContent';
import UnitableCellProgress from './UnitableCellProgress';
import UnitableCellAddress from './UnitableCellAddress';
import CellPrice from './CellPrice';
import CellHeartbeat from './CellHeartbeat';

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
  /* let columnname;
   if (column !== undefined) {
     var splitarray = column.split('.')
     if (splitarray.length > 0) {
       console.log("split array", splitarray)
       splitarray.forEach(order => {
         columnname = (columnname !== undefined ? columnname : '') + '[' + order + ']';
         console.log("column name", columnname)
       });
     } else {
       columnname = column;
     }
   } else {
     columnname = column;
   }
   console.log("column sort", sortData(column, direction))

   console.log("let's know", prop(column), descend(prop(column)), sortWith([descend(prop(column))])) */
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
  clickArgs,
}) => {
  const [activeColumn, setActiveColumn] = useState('');
  const [direction, setDirection] = useState('ascending');
  const [tableData, setTableData] = useState([]);
  const [activeRow, setActiveRow] = useState(-1);
  var priceValue;

  const handleSort = clickedColumn => () => {
    //   console.log("clickedColumn", clickedColumn, activeColumn)
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
            {columns.map(column => {
              return (
                <UnitableHeaderCell
                  {...column}
                  key={column.name}
                  activeColumn={activeColumn}
                  sortDirection={direction}
                  handleSort={handleSort}
                  columnHeader={
                    column.header !== undefined && column.header !== null
                      ? column.header
                      : column.name
                  }
                />
              );
            })}
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
                onRowClick(pick(clickArgs, tableData[key]));
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
                  color,
                  textAlign,
                  negative,
                  warning,
                }) => {
                  let tryvalue = '';
                  if (mapDataFrom !== undefined && columns.type !== 'price') {
                    const splitarray = mapDataFrom.split('.');
                    if (splitarray.length) {
                      tryvalue = tableData[key];
                      splitarray.forEach(order => {
                        if (tryvalue !== null && tryvalue !== undefined) {
                          if (
                            order === 'priceHistory' &&
                            tryvalue[order].length > 0
                          ) {
                            tryvalue[order].forEach(priceVal => {
                              if (priceVal.default) {
                                priceValue = priceVal.price;
                              }
                            });
                          }
                          tryvalue = tryvalue[order];
                        } else {
                          tryvalue = 'NULL';
                        }
                      });
                    } else {
                      tryvalue = tableData[key][mapDataFrom];
                    }
                  } else {
                    tryvalue =
                      tableData[key][mapDataFrom || name.toLowerCase()];
                  }
                  const value = tryvalue;
                  const style = {
                    color: color && color(value),
                  };

                  return (
                    <Table.Cell
                      key={name.toLowerCase()}
                      positive={positive && positive(value)}
                      negative={negative && negative(value)}
                      warning={warning && warning(value)}
                      textAlign={textAlign}
                      className={type || ''}
                      style={style}
                    >
                      {type === 'progress' && (
                        <UnitableCellProgress value={value} />
                      )}
                      {type === 'timeDifference' && (
                        <CellHeartbeat value={value} />
                      )}
                      {type === 'price' && (
                        <CellPrice value={priceValue} postfix={postfix} />
                      )}
                      {type === 'address' && (
                        <UnitableCellAddress value={value} />
                      )}
                      {!type && (
                        <UnitableCellContent
                          icon={icon}
                          value={value}
                          postfix={postfix}
                          style={style}
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
      progress: PropTypes.arrayOf.progress,
      color: PropTypes.func,
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
