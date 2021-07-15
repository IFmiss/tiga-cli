import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compileApp(options: InitShellType): string {
  const str = `
    import React from 'react';
    import { BrowserRouter as Router, Link } from 'react-router-dom';
    import routes, { RouterView } from '@/router';
    import Hello from '@/components/Hello';
    import styles from './index.scss';

    const App = () => {
      return (
        <Router basename="/home">
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
