import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, styleExt, tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { typescript } = options;
  const sExt = styleExt(options);
  const str = `
    import React, { memo } from 'react';
    import { useLocation, useParams } from 'react-router';

    import styles from './info.${sExt}';
    ${row(
      `
    export interface InfoProps {}`,
      typescript
    )}

    const Info${typescript ? ': React.FC<InfoProps>' : ''} = () => {
      const p = useParams${typescript ? '<{ id: string }>' : ''}();
      const l = useLocation();
      return (
        <div className={styles.info}>
          <p>this is Info</p>
          <p>path: {l.pathname}</p>
          <p>state: {JSON.stringify(l.state)}</p>
          <p>id: {p?.id}</p>
        </div>
      );
    };

    export default memo(Info);
  `;
  return tpl(str);
}
