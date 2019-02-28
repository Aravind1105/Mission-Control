import React, { useState } from 'react';
import { Dropdown, Header, Segment, Table } from 'semantic-ui-react';
import { SegmentHeader } from 'modules/shared/components';
import RankingItem from './RankingItem';

const options = [
  { key: 1, text: 'Today', value: 'today' },
  { key: 2, text: 'This week', value: 'week' },
  { key: 3, text: 'This month', value: 'last_week' },
];

const Ranking = ({ title, data }) => {
  const [timerange, setTimerange] = useState('today');

  return (
    <Segment>
      <SegmentHeader>
        <Header as="h4">
          <Header.Content>{title}</Header.Content>
        </Header>
        <div>
          <Dropdown
            onChange={(e, { value }) => {
              setTimerange(value);
            }}
            options={options}
            placeholder="Choose an option"
            selection
            value={timerange}
            style={{ minWidth: 115 }}
          />
        </div>
      </SegmentHeader>
      <Table unstackable basic="very" size="small">
        <Table.Body>
          {data.map((props, key) => (
            <RankingItem
              {...props}
              key={`${key}-${props.item}`}
              rank={key + 1}
            />
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default Ranking;
