import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compileComponent(options: InitShellType): string {
  const { typescript } = options;
  const str = `
    import { RouterView } from '@/router';
    import React, { memo } from 'react';
    import styles from './detail.less';
    ${row(
      `
    export interface DetailProps {}`,
      typescript
    )}

    const Detail${typescript ? ': RFC<DetailProps>' : ''} = ({ routes }) => {
      return (
        <h3 className={styles.detail}>
          this is detail
          <RouterView routes={routes}></RouterView>
        </h3>
      );
    };

    export default memo(Detail);
  `;
  return tpl(str);
}
