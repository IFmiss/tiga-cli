import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const str = `{
    test: /\\.(js|jsx|ts|tsx)$/,
    use: [
      {
        loader: 'thread-loader',
        options: {
          // 一个工作进程并行处理的作业数 (number of jobs a worker processes in parallel)
          // defaults to 20
          workerParallelJobs: 50,

          // 允许重启死掉的工作池 (Allow to respawn a dead worker pool)
          // 重启会减慢整个编译的速度 (respawning slows down the entire compilation)
          // 开发环境应该设置false (and should be set to false for development)
          poolRespawn: false,

          // timeout for killing the worker processes when idle
          // defaults to 500 (ms)
          // can be set to Infinity for watching builds to keep workers alive
          poolTimeout: 2000,

          // name of the pool
          // can be used to create different pools with elsewise identical options
          name: 'my-pool'
        }
      },
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  },`;
  return tpl(str, {
    indent: 8,
    startLineIndent: true,
    endNewline: false
  });
}
