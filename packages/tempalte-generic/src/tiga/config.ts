import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { name, template } = options;
  const str = `
    const path = require('path');

    module.exports = {
      type: '${template}',
      devServer: {
        devConfigFile: path.resolve(__dirname, './webpack.dev.config.js'),
        port: 2001,
        host: '0.0.0.0'
      }
    }
  `;
  return tpl(str);
}
