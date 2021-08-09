import { tpl } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { typescript } = options;
  const str = `
    import React, { Suspense } from 'react';
    import { Route, Redirect, Switch } from 'react-router-dom';

    import routes from './config';

    export const RouteWithSubRoutes = (route${
      typescript ? ': IRoute' : ''
    }) => {
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

    export const RouterView${
      typescript ? ': React.FC<RouterProviderProps>' : ''
    } = ({
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
  return tpl(str);
}
