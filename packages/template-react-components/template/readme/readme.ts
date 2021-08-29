import type { InitShellType } from '@tiga-cli/tpl-core';
import { tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { name } = options;
  const str = `
    # ${name}
    this is react components project
  `;
  return tpl(str);
}
