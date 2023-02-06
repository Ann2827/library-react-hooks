import React from 'react';
import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import Main from './pages/Main';
import ToastHook from './pages/ToastHook';
import LoaderHook from './pages/LoaderHook';
import HttpHook from './pages/HttpHook';
import { ROUTE_MAIN, ROUTE_LOADER, ROUTE_TOAST, ROUTE_HTTP, ROUTE_TIMER } from './constants/routes';
import TimeHook from './pages/TimeHook';
// import { withSlash } from './utils/url';

const routesConfig: RouteObject[] = [
  {
    path: ROUTE_MAIN,
    children: [
      {
        index: true,
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
        path: ROUTE_TIMER,
        element: <TimeHook />,
      },
      {
        path: ROUTE_HTTP,
        element: <HttpHook />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTE_MAIN} />,
  },
];

export default routesConfig;
