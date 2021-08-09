import { tpl, renderRow as row, styleExt } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const sExt = styleExt(options);
  const str = `
    import React from 'react';
    import { HashRouter as Router, Link } from 'react-router-dom';

    import Hello from '@/components/Hello';
    import routes, { RouterView } from '@/router';

    import styles from './index.${sExt}';

    const App = () => {
      return (
        <Router basename="/">
          <div className={styles.main}>
            <Hello />
            <Link to="/">
              <p>home</p>
            </Link>
            <Link to="/detail">
              <p>Go Detail</p>
            </Link>
            <Link
              to={{
                pathname: '/detail/22',
                search: '?a=1',
                state: { showInfo: true }
              }}
            >
              <p>Go Detail info</p>
            </Link>
          </div>
          <RouterView routes={routes}></RouterView>
        </Router>
      );
    };

    export default App;
  `;
  return tpl(str);
}
