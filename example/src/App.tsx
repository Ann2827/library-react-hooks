import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import Toast from './components/Toast';
import Loader from './components/Loader';
import routesConfig from './routesConfig';
import { RouteObject } from 'react-router';

type RoutesProps = {
  routes: RouteObject[];
};
const Routes: React.FC<RoutesProps> = ({ routes }: RoutesProps) => {
  const routing = useRoutes(routes);
  return routing;
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes routes={routesConfig} />
      </BrowserRouter>
      <Toast />
      <Loader />
    </div>
  );
};

export default App;
