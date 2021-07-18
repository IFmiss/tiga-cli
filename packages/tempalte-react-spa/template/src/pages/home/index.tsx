import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compileComponent(options: InitShellType): string {
  const { typescript } = options;
  const str = `
    import React, { memo } from 'react';
    import styles from './home.less';
    ${row(
      `
    export interface HomeProps {}`,
      typescript
    )}

    const Home${typescript ? ': React.FC<HomeProps>' : ''} = () => {
      return <h3 className={styles.home}>this is home</h3>;
    };

    export default memo(Home);
  `;
  return tpl(str);
}
