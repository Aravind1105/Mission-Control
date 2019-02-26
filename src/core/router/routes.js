import { lazy } from 'react';
import DashboardScreen from 'modules/dashboard/DashboardScreen';
import KiosksScreen from 'modules/kiosks/KiosksScreen';
import OrganizationsScreen from 'modules/organizations/OrganizationsScreen';
import UsersScreen from 'modules/users/UsersScreen';
import ProductsScreen from 'modules/products/ProductsScreen';
import FulfillmentScreen from 'modules/fulfillment/FulfillmentScreen';
import TransactionsScreen from 'modules/transactions/TransactionsScreen';

const ReportsScreen = lazy(() => import('modules/reports/ReportsScreen'));

export default [
  {
    name: 'Dashboard',
    path: '/',
    pathOptions: {
      exact: true,
    },
    icon: 'home',
    Component: DashboardScreen,
  },
  {
    name: 'Kiosks',
    path: '/kiosks',
    icon: 'snowflake',
    Component: KiosksScreen,
  },
  {
    name: 'Organizations',
    path: '/organizations',
    icon: 'building',
    Component: OrganizationsScreen,
  },
  {
    name: 'Users',
    path: '/users',
    icon: 'users',
    Component: UsersScreen,
  },
  {
    name: 'Products',
    path: '/products',
    icon: 'box',
    Component: ProductsScreen,
  },
  {
    name: 'Replenishment',
    path: '/replenishment',
    icon: 'truck',
    Component: FulfillmentScreen,
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: 'chart line',
    Component: ReportsScreen,
  },
  {
    name: 'Transactions',
    path: '/transactions',
    icon: 'shopping cart',
    Component: TransactionsScreen,
  },
];
