import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { prettier, stylelint, eslint } = options;
  const str = `
    module.exports = {
      'src/**/*.{js,jsx,ts,tsx}': [
        ${row(`'npm run lint:es:fix',`, eslint)}
        ${row(`'npm run lint:prettier:fix'`, prettier)}
      ],
      'src/**/*.{css,less,scss}': [
        ${row(`'npm run lint:style:fix',`, stylelint)}
        ${row(`'npm run lint:prettier:fix'`, prettier)}
      ]
    };
  `;
  return tpl(str);
}
