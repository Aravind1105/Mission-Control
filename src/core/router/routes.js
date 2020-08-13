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
    path: ['/', '/dashboard/almost-empty', '/dashboard/alerts'],
    pathOptions: {
      exact: true,
    },
    icon: 'home',
    Component: Dashboard,
    rootOnly: false,
  },
  {
    name: 'Kiosks',
    path: '/kiosks',
    icon: 'snowflake',
    Component: Kiosks,
    rootOnly: false,
  },
  {
    name: 'Organizations',
    path: '/organizations',
    icon: 'building',
    Component: Organizations,
    rootOnly: true,
  },
  {
    name: 'Users',
    path: '/users',
    icon: 'users',
    Component: Users,
    rootOnly: true,
  },
  {
    name: 'Products',
    path: '/products',
    icon: 'box',
    Component: Products,
    rootOnly: false,
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: 'chart line',
    Component: Reports,
    rootOnly: true,
  },
  {
    name: 'Transactions',
    path: '/transactions',
    icon: 'shopping cart',
    Component: Transactions,
    rootOnly: false,
  },
];
