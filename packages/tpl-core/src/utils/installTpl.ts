import { logInfo, obj2shell, shSync } from '@tiga-cli/utils';

import type { RenderTemplateOptions } from '../types/index';

const DEV = false;

export default function installTpl(options: RenderTemplateOptions) {
  const { templatePkg, template } = options;
  const shellParams = obj2shell(options);
  logInfo('start create template file \n');
  const str = DEV
    ? `node ./tiga-cli/packages/${
        templatePkg.split('/')?.[1]
      }/dist/bin/index.js init ${shellParams}`
    : `npx ${templatePkg} init ${shellParams}`;

  shSync(str, {
    errorText: `初始化 ${template} 项目失败`,
    stdio: 'inherit'
  });
}
