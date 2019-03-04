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
import './styles/uniTable.less';

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
  const [direction, setDirection] = useState('');
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (!initialized) {
      let outputData = tableData;
      const columnsFromData = Object.keys(tableData[0]);
      const sortedColumnOnStart = tableConfig.sortation;

      // not completed!
      let sortColumn;
      if (tableConfig.sorting === 'ascending') {
        sortColumn = sort(ascend(prop(sortedColumnOnStart)));
      } else if (tableConfig.sorting === 'descending') {
        sortColumn = sort(descend(prop(sortedColumnOnStart)));
      }

      outputData = pipe(
        ...map(
          fi =>
            filter(propSatisfies(compare(fi.comparsion)(fi.value))(fi.column)),
          filters,
        ),
        sortColumn,
        // sort(descend(prop(sortedColumnOnStart))),
      )(outputData);

      setColumns(columnsFromData);
      setSortedColumn(sortedColumnOnStart);
      setData(outputData);
      setDirection(tableConfig.sorting);
      setInitialized(true);
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
            (rowProp.onClick = () =>
              onClickRow(...tableConfig.clickArg.map(arg => row[arg])));
          return (
            <Table.Row key={index1} {...rowProp}>
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
