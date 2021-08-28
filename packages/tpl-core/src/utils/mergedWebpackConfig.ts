import Config from "webpack-chain";

import { workSpaceNodeModules } from "../index";
import { TigaConfig } from "../types";

const config = new Config();

export default function mergedWebpackConfig(
  webpackConfig: any,
  tiga: TigaConfig
) {
  const {
    devServer,
    devtool,
    publicPath,
    outputPath,
    proxy,
    alias,
    chainWebpack,
    ...rest
  } = tiga;

  const mergeConfig = webpackAutoMerge(webpackConfig, {
    output: {
      path: outputPath,
      publicPath
    },
    devtool,
    devServer: {
      ...devServer,
      proxy
    },
    resolve: {
      alias
    }
  });

  chainWebpack?.(config);

  const res = webpackAutoMerge(mergeConfig, config?.toConfig() || {});
  return res;
}

export const webpackAutoMerge = (webpackConfig: unknown, customConfig: any) => {
  const {
    webpackMerge: { merge }
  } = workSpaceNodeModules();
  return merge(webpackConfig, customConfig);
};
