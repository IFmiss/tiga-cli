import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { name } = options;
  const str = `
    # ${name}
    react-components 组件
  `;
  return tpl(str);
}
