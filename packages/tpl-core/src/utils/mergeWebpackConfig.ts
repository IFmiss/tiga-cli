import { TigaConfig } from '../types';
import { workSpaceNodeModules } from './../index';

export default function mergeWebpackConfig(
  tiga: TigaConfig,
  webpackConfig: unknown
) {
  const {
    webpack,
    webpackMerge: { merge },
    webpackDevServer: WebpackDevServer
  } = workSpaceNodeModules();

  return webpack;
}
