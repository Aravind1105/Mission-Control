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
  return (
    <Segment>
      <SegmentHeader>
        <Header as="h4" color="black">
          <Header.Content>{title}</Header.Content>
        </Header>
      </SegmentHeader>

      <Table className="reports-table">
        <Table.Header>
          <Table.Row>
            {headers.map(header => {
              let textAlign = 'left';
              if (header.fieldType === FieldTypes.PRICE) {
                textAlign = 'right';
              } else if (header.fieldType === FieldTypes.NUMBER) {
                textAlign = 'center';
              }
              return (
                <Table.HeaderCell
                  className="reports-table-cell reports-table-header"
                  textAlign={textAlign}
                >
                  {header.title}
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((row, index) => {
            let rowClassName = '';
            if (index % 2 === 1) {
              rowClassName = 'reports-table-row-odd';
            }
            return (
              <Table.Row className={rowClassName}>
                {keys.map(key => {
                  const idx = keys.indexOf(key);
                  const fieldType = fieldTypes[idx];
                  let textAlign = 'left';
                  if (fieldType === FieldTypes.PRICE) {
                    textAlign = 'right';
                  } else if (fieldType === FieldTypes.NUMBER) {
                    textAlign = 'center';
                  }
                  return (
                    <Table.Cell
                      className="reports-table-cell"
                      textAlign={textAlign}
                    >
                      {fieldType === FieldTypes.PRICE
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
