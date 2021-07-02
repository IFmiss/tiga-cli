import { spawnSync } from 'child_process';
import type { TypePkgTool } from './../constants';

import ora from 'ora';
import inquirer from 'inquirer';

const spinner = ora();

export default function checkPkgTool(pkgTool: TypePkgTool) {
  let hasPkgTool = false;
  return new Promise((resolve, reject) => {
    const { status } = spawnSync(`${pkgTool} -v`, {
      stdio: 'ignore'
    });

    if (status === 0) {
      hasPkgTool = true;
      resolve(void 0);
    }

    if (!hasPkgTool) {
      if (pkgTool === 'npm') {
        spinner.warn(`缺少 npm 包管理工具, 请自行安装`);
        reject();
        process.exit(0);
      }

      inquirer
        .prompt({
          name: 'install',
          message: `缺少${pkgTool}管理工具, 需要安装到全局环境吗 ?`,
          type: 'confirm'
        })
        .then(({ install }) => {
          if (!install) {
            reject();
            process.exit(0);
          }

          spinner.start();

          const { status } = spawnSync(`npm install -g ${pkgTool} --color`, {
            shell: true,
            stdio: 'inherit'
          });
          if (status === 0) {
            spinner.stop();
            resolve(true);
          } else {
            spinner.stop();
            reject();
            console.info(`${pkgTool}安装失败`);
            process.exit(0);
          }
        });
    }
  });
}
