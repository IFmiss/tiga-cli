export const NODE_MODULES_PATH = 'node_modules';
export const SERVE_CONFIG_PATH = 'config/webpack.dev.config.js';
export const BUILD_CONFIG_PATH = 'config/webpack.prod.config.js';
export const DEFAULT_PROT = 1994;
export const DEFAULT_HOST = '0.0.0.0';

export function workSpaceNodeModules() {
  const importFrom = require('import-from');

  return {
    webpack: importFrom(process.cwd(), 'webpack'),
    webpackMerge: importFrom(process.cwd(), 'webpack-merge'),
    webpackDevServer: importFrom(process.cwd(), 'webpack-dev-server')
  };
}
