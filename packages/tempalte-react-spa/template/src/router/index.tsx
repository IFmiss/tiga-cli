export default `import React, { lazy, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import routes from './config';
import PropTypes from 'prop-types';

export const RouteWithSubRoutes = (route: IRoute) => {
  const _Route = () => (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => {
        return route.redirect ? (
          <Redirect to={route.redirect} />
        ) : (
          <route.component {...props} routes={route.routes} />
        );
      }}
    />
  );
  return route.fallback ? (
    <Suspense fallback={route.fallback}>
      <_Route />
    </Suspense>
  ) : (
    <_Route />
  );
};

export const RouterView: React.FC<RouterProviderProps> = ({
  routes = [],
  ...rest
}) => {
  return (
    <Switch>
      {routes?.map((route, i) => (
        <RouteWithSubRoutes key={i} {...rest} {...route} />
      ))}
    </Switch>
  );
};

export default routes;
`;
