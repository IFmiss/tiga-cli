import { workSpaceNodeModules } from '../index';
import { TigaConfig } from '../types';

export default function mergedWebpackConfig(
  webpackConfig: any,
  tiga: TigaConfig
) {
  const { devServer, ...rest } = tiga;
  console.info('devServer', devServer);
  const mergeConfig = webpackAutoMerge(webpackConfig, {
    devServer
  });
  return mergeConfig;
}

export const webpackAutoMerge = (webpackConfig: unknown, customConfig: any) => {
  const {
    webpackMerge: { merge }
  } = workSpaceNodeModules();
  return merge(webpackConfig, customConfig);
};
