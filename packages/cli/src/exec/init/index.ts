import { INIT_FILE, installTpl } from '@tiga-cli/tpl-core';
import { jsonFileParse } from '@tiga-cli/utils';
import path from 'path';

export default async function init() {
  // 查找当前目录的 init 文件， 解析出内容
  const data = await jsonFileParse(path.resolve(process.cwd(), INIT_FILE));

  installTpl({
    ...data,
    initFile: INIT_FILE
  });
}
