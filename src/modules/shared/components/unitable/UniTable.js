import React, { useState, useEffect } from 'react';
import { map as mapObject } from 'lodash';
import {
  ascend,
  descend,
  filter,
  map,
  pipe,
  prop,
  propSatisfies,
  sort,
} from 'ramda';
import { Table } from 'semantic-ui-react';
import Cell from './UniTableCell';
import { compare } from './lib/comparsions';
// import './styles/uniTable.less';

const sortAndFilterData = (
  contentData,
  sortedColumn,
  sortingDirection,
  filters,
) => {
  let sortColumn =
    sortingDirection === 'ascending'
      ? sort(ascend(prop(sortedColumn)))
      : sort(descend(prop(sortedColumn)));

  return pipe(
    ...map(
      fi => filter(propSatisfies(compare(fi.comparsion)(fi.value))(fi.column)),
      filters,
    ),
    sortColumn,
  )(contentData);
};

const UniTable = ({
  tableConfig,
  tableColumns,
  tableData,
  filters,
  infos,
  onClickRow,
}) => {
  const [initialized, setInitialized] = useState(false);
  const [sortedColumn, setSortedColumn] = useState('');
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [direction, setDirection] = useState('');
  const [columns, setColumns] = useState([]);
  const [activeRow, setActiveRow] = useState(-1);

  useEffect(() => {
    if (!initialized) {
      const columnsFromData = tableColumns.map(col => col.name);
      const sortedColumnOnStart = tableConfig.sortation;

      tableConfig.active !== 'undefined' && setActiveRow(tableConfig.active);
      setColumns(columnsFromData);
      setSortedColumn(sortedColumnOnStart);
      setData(
        sortAndFilterData(
          tableData,
          sortedColumnOnStart,
          tableConfig.sorting,
          filters,
        ),
      );
      setRawData(tableData);
      setDirection(tableConfig.sorting);
      setInitialized(true);
    }
  });

  useEffect(() => {
    if (rawData !== tableData) {
      setData(sortAndFilterData(tableData, sortedColumn, direction, filters));
      setRawData(tableData);
    }
  });

  const handleSort = clickedColumn => () => {
    if (sortedColumn !== clickedColumn) {
      setSortedColumn(clickedColumn);
      setData(sort(ascend(prop(clickedColumn)))(data));
      setDirection('ascending');
      return;
    }
    setData(data.reverse());
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
  };

  return (
    <Table
      sortable
      celled
      selectable={tableConfig.selectable}
      fixed
      compact
      striped={tableConfig.striped}
      className="unitable"
      basic="very"
    >
      {!tableConfig.headless && (
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => {
              const tableColumn = tableColumns[index];
              if (tableColumn.width > 0) {
                return (
                  <Table.HeaderCell
                    key={index}
                    onClick={handleSort(col)}
                    sorted={sortedColumn === col ? direction : null}
                    className={`th-${col}`}
                    textAlign={tableColumn.align}
                    style={{
                      width: `${tableColumn.width}%`,
                    }}
                  >
                    {tableColumn.label}
                  </Table.HeaderCell>
                );
              }
            })}
          </Table.Row>
        </Table.Header>
      )}
      <Table.Body>
        {data.map((row, index1) => {
          const rowProp = {};
          tableConfig.selectable &&
            (rowProp.onClick = () => {
              setActiveRow(index1);
              onClickRow(...tableConfig.clickArg.map(arg => row[arg]));
            });
          return (
            <Table.Row
              key={index1}
              {...rowProp}
              active={
                activeRow === index1
                  ? tableConfig.selectableActive
                    ? true
                    : false
                  : false
              }
            >
              {mapObject(row, (value, index2) => {
                const column = tableColumns.filter(c => c.name === index2)[0];
                if (column.width > 0) {
                  return (
                    <Cell
                      key={index2}
                      col={index2}
                      value={value}
                      enumer={tableConfig.enumerated && index1 + 1}
                      infos={infos}
                      {...column}
                    />
                  );
                }
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default UniTable;
