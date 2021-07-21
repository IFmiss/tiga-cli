import { spawnSync } from 'child_process';
import { RenderTemplateOptions } from 'tiga-cli';
import { info as logInfo, error as logError } from './logger';
import obj2shell from './obj2shell';

export default function installTpl(options: RenderTemplateOptions) {
  const { template } = options;
  const shellParams = obj2shell(options);
  logInfo('shellParams', shellParams);

  // 执行命令
  const { status, error } = spawnSync(
    `node  ./tiga-cli/packages/tempalte-react-spa/dist/bin/index.js init ${shellParams}`,
    // `npx @tiga-cli/template-${template}/dist/bin/index.js init ${shellParams}`,
    {
      shell: true,
      stdio: 'inherit'
    }
  );

  if (status !== 0) {
    console.info();
    logError('初始化失败了 method [installTpl]', error);
    process.exit(0);
  }
}
