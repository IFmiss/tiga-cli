import type { InitShellType } from '@tiga-cli/tpl-core';
import { tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { name, template, uuid } = options;
  const str = `
    module.exports = {
      type: '${template}', // 模版类型
      uuid: '${uuid}', // 项目 uuid
      devServer: {
        host: '0.0.0.0' // dev host 地址
      },
      chainWebpack: (config) => {
        config.devServer.port(1994);  // dev 环境端口号
      }
    };
  `;
  return tpl(str);
}
