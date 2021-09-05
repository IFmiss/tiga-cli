import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { name } = options;
  const str = `
    # ${name}

    react-spa 单页面应用

    ### yarn serve
    启动一个 webpack dev 服务

    ### yarn build
    打包项目
  `;
  return tpl(str);
}
