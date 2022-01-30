import React from 'react';
import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import Main from './pages/Main';
import ToastHook from './pages/ToastHook';
import LoaderHook from './pages/LoaderHook';
import {
  ROUTE_MAIN,
  ROUTE_LOADER,
  ROUTE_TOAST,
} from './constants/routes';
// import { withSlash } from './utils/url';

const routesConfig: RouteObject[] = [
  {
    path: ROUTE_MAIN,
    element: <Main />,
  },
  {
    path: ROUTE_TOAST,
    element: <ToastHook />,
  },
  {
    path: ROUTE_LOADER,
    element: <LoaderHook />,
  },
  {
    path: '*',
    element: <Navigate to={ROUTE_MAIN} />,
  },
];

export default routesConfig;
