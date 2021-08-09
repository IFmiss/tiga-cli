import type { RenderTemplateOptions } from '../types/index';
import { shSync, obj2shell, logInfo } from '@tiga-cli/utils';

export default function installTpl(options: RenderTemplateOptions) {
  const { templatePkg, template } = options;
  const shellParams = obj2shell(options);
  logInfo('start create template file \n');
  shSync(
    `npx ${templatePkg} init ${shellParams}`,
    // `node ./tiga-cli/packages/template-react-spa/dist/bin/index.js init ${shellParams}`,
    {
      errorText: `初始化 ${template} 项目失败`,
      stdio: 'inherit'
    }
  );
}
