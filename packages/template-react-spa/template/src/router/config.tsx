import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { typescript } = options;
  const str = `
    import React, { lazy } from 'react';

    import Loading from '@/components/Loading';
    import Home from '@/pages/home';

    const Detail = lazy(() => import('@/pages/detail'));
    const DetailInfo = lazy(() => import('@/modules/detail/info'));

    const routes${typescript ? ': IRoute[]' : ''} = [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/detail',
        component: Detail,
        fallback: <Loading />,
        routes: [
          {
            path: '/detail/:id',
            component: DetailInfo,
            exact: false,
            fallback: <Loading />
          }
        ]
      }
    ];

    export default routes;
  `;
  return tpl(str);
}
