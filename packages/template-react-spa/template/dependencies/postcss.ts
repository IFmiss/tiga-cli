import type { InitShellType } from '@tiga-cli/tpl-core';

import postcss_viewport from './postcss_viewport';
import { ModuleDependencies } from './types';

const POSTCSS_DEFAULT = {
  devDependencies: {
    autoprefixer: '^10.2.6',
    postcss: '^8.3.6',
    'postcss-loader': '^6.1.1',
    'postcss-preset-env': '^6.7.0'
  },
  dependencies: {}
};

export default function postcss(options: InitShellType): ModuleDependencies {
  const { layout } = options;
  if (layout !== 'viewport') {
    return POSTCSS_DEFAULT;
  }

  return {
    devDependencies: {
      ...POSTCSS_DEFAULT.devDependencies,
      ...postcss_viewport.devDependencies
    },
    dependencies: {
      ...POSTCSS_DEFAULT.dependencies,
      ...postcss_viewport.dependencies
    }
  };
}
