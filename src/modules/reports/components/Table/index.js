import React from 'react';
import { Table, Segment, Header } from 'semantic-ui-react';
import SegmentHeader from 'modules/shared/components/SegmentHeader';

import './styles.less';

export const FieldTypes = {
  STRING: 'string',
  PRICE: 'price',
  NUMBER: 'number',
  RANK: 'rank',
};

const ReportsTable = ({ title, headers, data }) => {
  const keys = headers.map(header => header.key);
  const fieldTypes = headers.map(header => header.fieldType);
  const textAligns = headers.map(header => {
    if (header.fieldType === FieldTypes.PRICE) {
      return 'right';
    } else if (header.fieldType === FieldTypes.NUMBER) {
      return 'center';
    } else {
      return 'left';
    }
  });
  return (
    <Segment size="small">
      <SegmentHeader>
        <Header as="h4" color="black">
          <Header.Content>{title}</Header.Content>
        </Header>
      </SegmentHeader>

      <Table className="reports-table">
        <Table.Header>
          <Table.Row>
            {headers.map((header, index) => {
              return (
                <Table.HeaderCell
                  className="reports-table-cell reports-table-header"
                  textAlign={textAligns[index]}
                >
                  {header.title}
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row, rowIndex) => {
            let rowClassName = '';
            if (rowIndex % 2 === 0) {
              rowClassName = 'reports-table-row-odd';
            }
            return (
              <Table.Row className={rowClassName}>
                {keys.map((key, colIndex) => {
                  return (
                    <Table.Cell
                      className="reports-table-cell"
                      textAlign={textAligns[colIndex]}
                    >
                      {fieldTypes[colIndex] === FieldTypes.PRICE
                        ? row[key] + ' €'
                        : row[key]}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default ReportsTable;
