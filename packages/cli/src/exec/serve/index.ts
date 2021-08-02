import type { TigaConfig, WebpackServeOptions } from '@tiga-cli/tpl-core';
import serveWebpack from './webpack';

export default async function serve(
  config: TigaConfig,
  options: WebpackServeOptions
): Promise<void> {
  const { type } = config;
  if (type === 'react-spa' || type === 'react-components') {
    serveWebpack(config, options);
  }
}
