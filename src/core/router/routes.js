import { lazy } from 'react';

const DashboardScreen = lazy(() => import('modules/dashboard/DashboardScreen'));
const KiosksScreen = lazy(() => import('modules/kiosks/KiosksScreen'));
const OrganizationsScreen = lazy(() =>
  import('modules/organizations/OrganizationsScreen'),
);
const UsersScreen = lazy(() => import('modules/users/UsersScreen'));
const ProductsScreen = lazy(() => import('modules/products/ProductsScreen'));
const FulfillmentScreen = lazy(() =>
  import('modules/fulfillment/FulfillmentScreen'),
);
const TransactionsScreen = lazy(() =>
  import('modules/transactions/TransactionsScreen'),
);
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
