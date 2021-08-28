import type { InitShellType } from "@tiga-cli/tpl-core";
import { renderRow as row, styleExt, tpl } from "@tiga-cli/tpl-core";

export default function compile(options: InitShellType): string {
  const { typescript, name } = options;
  const sExt = styleExt(options);
  const str = `
    import React, { memo } from 'react';

    import styles from './hello.${sExt}';
    ${row(
      `
    export interface HelloProps {}`,
      typescript
    )}

    const Hello${typescript ? ": React.FC<HelloProps>" : ""} = () => {
      return <h3 className={styles.hello}> ${name.toUpperCase()} 🥬</h3>;
    };

    export default memo(Hello);
  `;
  return tpl(str);
}
