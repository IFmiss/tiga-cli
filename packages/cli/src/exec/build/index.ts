import type { BuildOptions, TigaConfig } from '@tiga-cli/tpl-core';

import buildComponent from './component';
import buildWebpack from './webpack';

export default async function build(
  config: TigaConfig,
  options: BuildOptions
): Promise<void> {
  const { type } = config;
  const { component } = options;
  if (type === 'react-spa' || (type === 'react-components' && !component)) {
    buildWebpack(config, options);
  }
  if (type === 'react-components' && component) {
    buildComponent(config, options);
  }
}
