import { lazy } from 'react';

const Dashboard = lazy(() => import('modules/dashboard'));
const Kiosks = lazy(() => import('modules/kiosks'));
const Organizations = lazy(() => import('modules/organizations'));
const Users = lazy(() => import('modules/users'));
const Products = lazy(() => import('modules/products'));
const Transactions = lazy(() => import('modules/transactions'));
const Reports = lazy(() => import('modules/reports'));

export default [
  {
    name: 'Dashboard',
    path: '/',
    pathOptions: {
      exact: true,
    },
    icon: 'home',
    Component: Dashboard,
  },
  {
    name: 'Kiosks',
    path: '/kiosks',
    icon: 'snowflake',
    Component: Kiosks,
  },
  {
    name: 'Organizations',
    path: '/organizations',
    icon: 'building',
    Component: Organizations,
  },
  {
    name: 'Users',
    path: '/users',
    icon: 'users',
    Component: Users,
  },
  {
    name: 'Products',
    path: '/products',
    icon: 'box',
    Component: Products,
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: 'chart line',
    Component: Reports,
  },
  {
    name: 'Transactions',
    path: '/transactions',
    icon: 'shopping cart',
    Component: Transactions,
  },
];
