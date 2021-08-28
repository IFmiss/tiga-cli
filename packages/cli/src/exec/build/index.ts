import type { TigaConfig, WebpackBuildOptions } from '@tiga-cli/tpl-core';
import buildWebpack from './webpack';

export default async function build(config: TigaConfig, options: WebpackBuildOptions): Promise<void> {
  const { type } = config;
  if (type === 'react-spa' || type === 'react-components') {
    buildWebpack(config, options);
  }
}
