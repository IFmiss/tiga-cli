import { tpl } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { name } = options;
  const str = `
    # ${name}
    this is react-spa project
  `;
  return tpl(str);
}
