import type { TigaConfig, WebpackBuildOptions } from "@tiga-cli/tpl-core";
import { workSpaceNodeModules } from "@tiga-cli/tpl-core";
import { logError, logSuccess } from "@tiga-cli/utils";
import { Compiler } from "webpack";

import { BUILD_CONFIG_PATH } from "../../constants";

const importFrom = require("import-from");

export default function buildWebpack(
  config: TigaConfig,
  options: WebpackBuildOptions
) {
  const {
    webpack,
    webpackMerge: { merge }
  } = workSpaceNodeModules();

  const webpackBuildConfig = importFrom(process.cwd(), BUILD_CONFIG_PATH);

  const compiler: Compiler = webpack(merge(webpackBuildConfig, {}));

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        if (!err.message) {
          logError(err);
          reject(err);
        }
      }
      console.info(
        stats?.toString({
          modules: false,
          errorDetails: false,
          cached: false,
          env: true,
          publicPath: true,
          outputPath: true,
          performance: true,
          timings: true,
          colors: "cyan"
        })
      );
      logSuccess("build success!");
      resolve(stats);
    });
  });
}
