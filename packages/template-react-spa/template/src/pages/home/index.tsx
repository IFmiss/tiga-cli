import { tpl, renderRow as row, styleExt } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { typescript } = options;
  const sExt = styleExt(options);
  const str = `
    import React, { memo } from 'react';

    import styles from './home.${sExt}';
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
