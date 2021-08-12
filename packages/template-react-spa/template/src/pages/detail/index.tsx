import { tpl, renderRow as row, styleExt } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { typescript } = options;
  const sExt = styleExt(options);
  const str = `
    import React, { memo } from 'react';

    import { RouterView } from '@/router';

    import styles from './detail.${sExt}';
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
