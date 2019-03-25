import React from 'react';
import { Segment, Container, Pagination, Grid } from 'semantic-ui-react';
import {
  Unitable,
  valueEquals,
  conditionalValue,
} from '../../shared/components/unitableReloaded';
import { genUserListMock } from '../mocks/userMock';
import { primaryColor, red, orange, teal } from '../../../lib/colors';

const userList = genUserListMock(20);

const UsersContent = () => {
  const columns = [
    {
      name: 'Name',
    },
    {
      name: 'Type',
      color: conditionalValue([
        ['Customer', primaryColor],
        ['Admin', red],
        ['Employee', orange],
        ['Replenisher', teal],
      ]),
    },
  ];

  return (
    <Grid>
      <Grid.Row columns="equal" stretched>
        <Grid.Column width={5}>
          <Segment>
            <Unitable
              data={userList}
              columns={columns}
              // onRowClick={clickRow}
              // clickArgs={['id']}
              sortable
              selectable
              sortByColumn="name"
            />
            {true && (
              <Container textAlign="center">
                <Pagination
                  style={{ marginTop: '10px' }}
                  defaultActivePage={1}
                  boundaryRange={0}
                  onPageChange={null}
                  size="mini"
                  siblingRange={1}
                  totalPages={1}
                />
              </Container>
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default UsersContent;
