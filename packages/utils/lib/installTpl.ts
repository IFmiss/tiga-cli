import { spawnSync } from 'child_process';
import { RenderTemplateOptions } from 'tiga-cli';
import { info as logInfo, error as logError } from './logger';
import obj2shell from './obj2shell';
import sh from './sh';

export default function installTpl(options: RenderTemplateOptions) {
  const { template } = options;
  const shellParams = obj2shell(options);

  sh(
    // npx @tiga-cli/template-${template}/dist/bin/index.js init ${shellParams}
    `node ./tiga-cli/packages/tempalte-react-spa/dist/bin/index.js init ${shellParams}`,
    {
      errorText: '初始化template失败'
    }
  );
}
