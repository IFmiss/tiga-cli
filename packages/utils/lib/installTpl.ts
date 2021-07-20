import { spawnSync } from 'child_process';
import { RenderTemplateOptions } from 'tiga-cli';
import { info as logInfo, error as logError } from './logger';
import obj2shell from './obj2shell';

export default function installTpl(options: RenderTemplateOptions) {
  const shellParams = obj2shell(options);
  logInfo('shellParams', shellParams);

  // 执行命令
  const { status, error } = spawnSync(
    // `node -r ts-node/register  ./../../tempalte-react-spa/bin/index.ts init ${shellParams}`,
    `npx ./../packages/tempalte-react-spa/dist/bin/index.js init ${shellParams}`,
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
