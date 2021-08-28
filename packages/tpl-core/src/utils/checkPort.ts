import { logWarn } from "@tiga-cli/utils";
import chalk from "chalk";
import detect from "detect-port";

export default function checkPort(port: number): Promise<any> {
  return new Promise((resolve, reject) => {
    detect(port, (err, _port) => {
      if (err) {
        console.error("err: ", err);
        reject(err);
      }
      if (port !== _port) {
        console.info();
        logWarn(
          chalk.yellow(
            `[提示]: ${port} 端口被占用了，为您切换至 ${_port} (${port} port is occupied, switch to ${_port} for you)`
          )
        );
        console.info();
      }
      resolve(_port);
    });
  });
}
