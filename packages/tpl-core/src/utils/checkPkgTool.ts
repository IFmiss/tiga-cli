import { logError, logWarn } from "@tiga-cli/utils";
import { spawnSync } from "child_process";
import inquirer from "inquirer";

import type { TypePkgTool } from "./../types/index";

export default function checkPkgTool(pkgTool: TypePkgTool): Promise<boolean> {
  let hasPkgTool = false;
  return new Promise((resolve, reject) => {
    const { status } = spawnSync(pkgTool, ["-v"], {
      stdio: "ignore"
    });

    if (status === 0) {
      hasPkgTool = true;
      resolve(true);
    }

    if (!hasPkgTool) {
      if (pkgTool === "npm") {
        logWarn(`缺少 npm 包管理工具, 请自行安装`);
        reject();
        process.exit(0);
      }

      inquirer
        .prompt({
          name: "install",
          message: `缺少${pkgTool}管理工具, 需要安装到全局环境吗 ?`,
          type: "confirm"
        })
        .then(({ install }) => {
          if (!install) {
            reject();
            process.exit(0);
          }

          const { status } = spawnSync(`npm install -g ${pkgTool}`, {
            shell: true,
            stdio: "inherit"
          });
          if (status === 0) {
            resolve(true);
          } else {
            reject();
            logError(`${pkgTool}安装失败`);
            process.exit(0);
          }
        });
    }
  });
}
