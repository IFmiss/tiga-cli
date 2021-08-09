import { logError } from '@tiga-cli/utils';
import type { TigaConfig, WebpackServeOptions } from '@tiga-cli/tpl-core';
import { createCert, checkPort } from '@tiga-cli/tpl-core';
import {
  workSpaceNodeModules,
  SERVE_CONFIG_PATH,
  DEFAULT_PROT,
  DEFAULT_HOST
} from '../../connstants';
const importFrom = require('import-from');

export default async function serveWebpack(
  config: TigaConfig,
  options: WebpackServeOptions
) {
  const {
    webpack,
    webpackMerge: { merge },
    webpackDevServer: WebpackDevServer
  } = workSpaceNodeModules();
  const { devServer, ...rest } = config;
  let webpackDevConfig;

  try {
    webpackDevConfig = importFrom(process.cwd(), SERVE_CONFIG_PATH);
  } catch (e) {
    webpackDevConfig = {};
  }

  const h = devServer?.host || DEFAULT_HOST;
  const p = options.port || devServer?.port || DEFAULT_PROT;
  // check port
  const port = await checkPort(Number(p));

  // https
  const certInfo = devServer.cert
    ? await createCert({
        host: 'localhost'
      })
    : null;

  const mergeConfig = merge(webpackDevConfig, {
    // ...rest,
    mode: 'development',
    devServer: {
      ...devServer,
      port,
      host: h,
      https: certInfo ?? void 0
    }
  });

  const host = mergeConfig?.devServer?.host;
  const open = mergeConfig?.devServer?.open;

  try {
    const compiler = webpack(mergeConfig);

    const server = new WebpackDevServer(compiler, {
      open
    });

    server.listen(port, host);
  } catch (e) {
    logError(e);
  }
}
