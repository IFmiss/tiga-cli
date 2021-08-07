import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { name, template, uuid } = options;
  const str = `
    const path = require('path');

    module.exports = {
      type: '${template}',    // 模版类型 请勿修改
      uuid: '${uuid}',    // 项目唯一 uuid 请勿修改
      devServer: {
        port: 2001,   // dev 环境端口号
        host: '0.0.0.0'   // dev host 地址
      }
    }
  `;
  return tpl(str);
}
