import React, { useState } from 'react';
// import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { Grid, Button, Icon, Header, Label } from 'semantic-ui-react';

import { UniTable } from 'modules/shared/components/unitable';

import { productsTableData } from '../mocks/organziationsMocks';

const productsTableConfig = {
  headless: false,
  enumerated: false,
  striped: true,
  selectable: true,
  sortation: 'category',
  sorting: 'ascending',
  clickArg: ['id', 'name', 'price', 'category'],
};

const productsTableColumns = [
  {
    name: 'id',
    label: '',
    unit: '',
    width: 0,
    align: '',
  },
  {
    name: 'name',
    label: 'Name',
    unit: '',
    width: 45,
    align: 'left',
  },
  {
    name: 'supplier',
    label: 'Supplier',
    unit: '',
    width: 20,
    align: 'left',
  },
  {
    name: 'category',
    label: 'Category',
    unit: '',
    width: 20,
    align: 'left',
  },
  {
    name: 'price',
    label: 'Price',
    unit: '€',
    width: 15,
    align: 'right',
  },
];

const infos = [];

const newOrderTableConfig = {
  headless: true,
  enumerated: false,
  striped: true,
  selectable: true,
  sortation: 'name',
  sorting: 'ascending',
  clickArg: ['id'],
};

const newOrderTableColumns = [
  {
    name: 'id',
    label: '',
    unit: '',
    width: 0,
    align: '',
  },
  {
    name: 'category',
    label: '',
    unit: '',
    width: 0,
    align: '',
  },
  {
    name: 'quantity',
    label: 'Quantity',
    unit: '',
    width: 15,
    align: 'center',
  },
  {
    name: 'name',
    label: 'Name',
    unit: '',
    width: 60,
    align: 'left',
  },
  {
    name: 'price',
    label: 'Price',
    unit: '€',
    width: 25,
    align: 'right',
  },
];
const newOrderCatsTableConfig = {
  headless: true,
  enumerated: false,
  striped: true,
  selectable: false,
  sortation: 'category',
  sorting: 'ascending',
  clickArg: [],
};

const newOrderCatsTableColumns = [
  {
    name: 'quantity',
    label: 'Quantity',
    unit: '',
    width: 15,
    align: 'center',
  },
  {
    name: 'category',
    label: 'Category',
    unit: '',
    width: 60,
    align: 'left',
  },
  {
    name: 'price',
    label: 'Price',
    unit: '€',
    width: 25,
    align: 'right',
  },
];

const style = { marginTop: '0px' };

const DetailsOrders = ({ fridgeID }) => {
  const [newOrder, setNewOrder] = useState([]);
  const [totalValue, setTotalValue] = useState(0.0);
  const [totalItems, setTotalItems] = useState(0);
  const [newOrderCategories, setNewOrderCategories] = useState([]);

  const addToOrder = (id, name, price, category) => {
    let updatedOrder = newOrder;
    let addedOrder = newOrder.filter(order => order.id === id);

    // addedOrder.length === 1
    //   ? addedOrder.quantity = addedOrder.quantity + 1
    //   : (addedOrder = { quantity: 1, id, name, price });
    if (addedOrder.length === 1) {
      const nO = newOrder.map(order => {
        if (order.id === id) {
          order.quantity = order.quantity + 1;
        }
        return order;
      });
      // setNewOrder(nO);
      updatedOrder = nO;
    } else {
      // setNewOrder([...newOrder, { quantity: 1, id, name, price, category }]);
      updatedOrder = [...newOrder, { quantity: 1, id, name, price, category }];
    }
    setNewOrder(updatedOrder);
    // const nOrder = [...newOrder, addedOrder];
    // setNewOrder(nOrder);
    transformOrderToCategories(updatedOrder);
    calculateNewOrderTotalAmount(updatedOrder);
  };

  const removeFromOrder = id => {
    const updatedOrder = newOrder
      .map(order => {
        if (order.id === id) {
          if (order.quantity > 0) order.quantity = order.quantity - 1;
        }
        return order;
      })
      .filter(order => order.quantity !== 0);
    setNewOrder(updatedOrder);
    transformOrderToCategories(updatedOrder);
    calculateNewOrderTotalAmount(updatedOrder);
  };

  const calculateNewOrderTotalAmount = actOrder => {
    let totalValue = 0.0;
    let totalItems = 0;
    actOrder.forEach(order => {
      totalValue += order.quantity * order.price;
      totalItems += order.quantity;
    });
    setTotalValue(totalValue);
    setTotalItems(totalItems);
  };

  const transformOrderToCategories = orderByArticle => {
    let nO = [];
    // const ord = groupBy(orderByArticle, order => order.category);
    orderByArticle.forEach((order, index) => {
      let foundIndex = nO.findIndex(o => o.category === order.category);
      if (foundIndex > -1) {
        nO[foundIndex].price += order.quantity * order.price;
        nO[foundIndex].quantity += order.quantity;
      } else {
        nO.push({
          quantity: order.quantity,
          category: order.category,
          price: order.price * order.quantity,
        });
      }
    });
    setNewOrderCategories(nO);
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column mobile={16} computer={16} textAlign="center">
          <Header as="h3">
            New Replenishment order for Fridge #{fridgeID}
          </Header>
          <UniTable
            tableConfig={productsTableConfig}
            tableColumns={productsTableColumns}
            tableData={productsTableData}
            filters={[]}
            infos={[]}
            onClickRow={(...args) =>
              addToOrder(args[0], args[1], args[2], args[3])
            }
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column mobile={16} computer={8}>
          <Header as="h4" dividing style={{ paddingBottom: '8px' }}>
            New order by category
          </Header>
          <UniTable
            tableConfig={newOrderCatsTableConfig}
            tableColumns={newOrderCatsTableColumns}
            tableData={newOrderCategories}
            filters={[]}
            infos={[]}
          />
          <Header as="h5" style={style} textAlign="right">
            Inventory Level after this order:
            <Label color={'green'}>{`100 %`}</Label>
          </Header>
        </Grid.Column>
        <Grid.Column mobile={16} computer={8}>
          <Header as="h4" dividing>
            <Grid columns={2}>
              <Grid.Column mobile={10} computer={10}>
                New Order by article
              </Grid.Column>
              <Grid.Column
                mobile={6}
                computer={6}
                textAlign="right"
                verticalAlign="top"
              >
                <Label color={'blue'} size="tiny">
                  {`${totalItems} items`}
                </Label>
              </Grid.Column>
            </Grid>
          </Header>
          <UniTable
            tableConfig={newOrderTableConfig}
            tableColumns={newOrderTableColumns}
            tableData={newOrder}
            filters={[]}
            infos={infos}
            onClickRow={id => removeFromOrder(id)}
          />
          <Header as="h5" style={style} textAlign="right">
            Total value of new order:
            <Label color={'red'}>{`${totalValue.toFixed(2)} €`}</Label>
          </Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column textAlign="center">
          <Button compact color={'blue'}>
            <Icon name="send" />
            Finish New Replenishment Order
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default DetailsOrders;
