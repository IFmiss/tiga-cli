import type { TigaConfig, WebpackServeOptions } from "@tiga-cli/tpl-core";
import {
  checkPort,
  createCert,
  DEFAULT_HOST,
  DEFAULT_PROT,
  mergedWebpackConfig,
  webpackAutoMerge,
  workSpaceNodeModules
} from "@tiga-cli/tpl-core";
import { logError } from "@tiga-cli/utils";

import { SERVE_CONFIG_PATH } from "../../constants";

const importFrom = require("import-from");

export default async function serveWebpack(
  tiga: TigaConfig,
  options: WebpackServeOptions
) {
  const { webpack, webpackDevServer: WebpackDevServer } =
    workSpaceNodeModules();

  let webpackDevConfig;

  try {
    webpackDevConfig = importFrom(process.cwd(), SERVE_CONFIG_PATH);
  } catch (e) {
    webpackDevConfig = {};
  }

  // merge webpack devConfig fist time
  const config = mergedWebpackConfig(webpackDevConfig, {
    ...tiga,
    devServer: {
      ...tiga.devServer,
      host: tiga?.devServer?.host || DEFAULT_HOST,
      port: options?.port || tiga?.devServer?.port || DEFAULT_PROT,
      open: options?.open
    }
  });

  // check port
  const port = await checkPort(Number(config.devServer.port));

  // https
  const certInfo = config.devServer.cert
    ? await createCert({
        host: "localhost"
      })
    : null;

  // update dev config in runtime
  const resultConfig = webpackAutoMerge(config, {
    mode: "development",
    devServer: {
      port,
      https: certInfo ?? false
    }
  });

  try {
    const compiler = webpack(resultConfig);

    const server = new WebpackDevServer(compiler, {
      open: resultConfig?.devServer?.open
    });

    server.listen(port, resultConfig.devServer.host);
  } catch (e) {
    logError(e);
  }
}
