import detect from 'detect-port';
import chalk from 'chalk';

export default function checkPort(
  port: string | number,
  compiler: any
): Promise<any> {
  return new Promise((resolve, reject) => {
    detect(port, (err, _port) => {
      if (err) {
        console.error('err: ', err);
        reject(err);
      }

      // 冲突
      if (port !== _port) {
        console.info(`\n`);
        console.info(`\n`);
        console.info(
          chalk.yellow(
            `[提示]: ${port} 端口被占用了，为您切换至 ${_port} (${port} port is occupied, switch to ${_port} for you)`
          )
        );
        console.info(`\n`);
      }
      // need 用户确认
      resolve(_port);
    });
  });
}
