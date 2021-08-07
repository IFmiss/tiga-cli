import { RenderTemplateOptions } from '@tiga-cli/tpl-core';
import obj2shell from './obj2shell';
import shSync from './shSync';
import { info, success } from './logger';

export default function installTpl(options: RenderTemplateOptions) {
  const { templatePkg, template } = options;
  const shellParams = obj2shell(options);
  info('start create template file \n');
  shSync(
    `npx ${templatePkg} init ${shellParams}`,
    // `node ./tiga-cli/packages/tempalte-react-spa/dist/bin/index.js init ${shellParams}`,
    {
      errorText: `初始化 ${template} 项目失败`,
      stdio: 'inherit'
    }
  );
}
