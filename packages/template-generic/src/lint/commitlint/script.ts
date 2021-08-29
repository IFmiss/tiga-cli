import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { commitlint, stylelint } = options;
  const str = `
    ${row(`"pre-commit": "lint-staged",`, commitlint)}
    ${row('"commit-msg": "commitlint --edit $1",', commitlint && stylelint)}
  `;
  return tpl(str);
}
