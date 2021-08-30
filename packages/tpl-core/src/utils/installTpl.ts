import { logInfo, obj2shell, shSync } from '@tiga-cli/utils';

import type { RenderTemplateOptions } from '../types/index';

export default function installTpl(options: RenderTemplateOptions) {
  const { templatePkg, template } = options;
  const shellParams = obj2shell(options);
  logInfo('start create template file \n');
  const str = `node ./tiga-cli/packages/${
    templatePkg.split('/')?.[1]
  }/dist/bin/index.js init ${shellParams}`;
  console.info('templatePkg', str);
  shSync(
    // `npx ${templatePkg} init ${shellParams}`,
    `node ./tiga-cli/packages/${
      templatePkg.split('/')?.[1]
    }/dist/bin/index.js init ${shellParams}`,
    {
      errorText: `初始化 ${template} 项目失败`,
      stdio: 'inherit'
    }
  );
}
