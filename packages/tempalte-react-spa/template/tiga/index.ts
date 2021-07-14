import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compileTiga(options: InitShellType): string {
  const { name } = options;
  const str = `
    module.exports = {
      name: '${name}'
    }
  `;
  return tpl(str);
}
