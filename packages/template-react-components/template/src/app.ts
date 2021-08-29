import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, styleExt, tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const sExt = styleExt(options);
  const str = `
    import React from 'react';

    import { Loading } from '@/components';

    const App = () => {
      return <Loading></Loading>;
    };

    export default App;
  `;
  return tpl(str);
}
