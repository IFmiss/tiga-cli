import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { typescript } = options;
  const str = `
    import React, { memo } from 'react';
    import styles from './hello.less';
    ${row(
      `
    export interface HelloProps {}`,
      typescript
    )}

    const Hello${typescript ? ': React.FC<HelloProps>' : ''} = () => {
      return <h3 className={styles.hello}> DEMO-REACT-SPA 🥬</h3>;
    };

    export default memo(Hello);
  `;
  return tpl(str);
}
