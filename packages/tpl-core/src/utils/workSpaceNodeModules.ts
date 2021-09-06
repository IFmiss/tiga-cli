export default function workSpaceNodeModules() {
  const importFrom = require('import-from');

  return {
    webpack: importFrom(process.cwd(), 'webpack'),
    webpackMerge: importFrom(process.cwd(), 'webpack-merge'),
    webpackDevServer: importFrom(process.cwd(), 'webpack-dev-server'),
    gulp: importFrom(process.cwd(), 'gulp')
  };
}
