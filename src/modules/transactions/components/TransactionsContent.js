import React from 'react';
import { Segment } from 'semantic-ui-react';
import format from 'date-fns/format';

import CustomTable from 'modules/shared/components/unitableReloaded/CustomTable';
import Loader from 'modules/shared/components/Loader';

const itemsPurchasedFormatter = items => {
  const list = items.reduce((prev, { productLine }) => {
    const { _id, name } = productLine;
    if (_id in prev) {
      prev[_id].count += 1;
    } else {
      prev[_id] = {
        name,
        count: 1,
      };
    }
    return prev;
  }, {});

  return Object.keys(list)
    .map(id => `${list[id].count} ${list[id].name}`)
    .join(', ');
};

const columns = [
  {
    title: 'Date/Time',
    field: 'created',
    formatter: ({ created }) => {
      return format(new Date(created), 'dd-MM-yyyy HH:mm:ss');
    },
  },
  {
    title: 'Amount',
    field: 'total',
    formatter: ({ total }) => `${total} €`,
  },
  {
    title: 'Purchased',
    field: 'itemsPurchased',
    formatter: ({ itemsPurchased }) => itemsPurchasedFormatter(itemsPurchased),
  },
  {
    title: 'Fridge',
    field: 'itemsPurchased.0.kiosk.name',
  },
  {
    title: 'User',
    field: 'user',
    formatter: ({ session: { user } }) => {
      if (user) return `${user.firstName || ''} ${user.lastName || ''}`.trim();
      return 'N.A.';
    },
  },
];

const TransactionsContent = ({ isLoading, transactions, getData }) => {
  // const clickRow = ({ _id }) => {
  //   history.push(`/kiosks/detail/${_id}`);
  // };

  return (
    <>
      <Segment>
        <CustomTable
          sortByColumn="created"
          columns={columns}
          data={transactions}
          getData={getData}
          sortable
          selectable
          isLoading={isLoading}
        />
      </Segment>
    </>
  );
};

export default TransactionsContent;
