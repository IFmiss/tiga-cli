import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compile(options?: InitShellType): string {
  const str = `
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './app';

    ReactDOM.render(<App />, document.getElementById('root'));
  `;
  return tpl(str);
}
