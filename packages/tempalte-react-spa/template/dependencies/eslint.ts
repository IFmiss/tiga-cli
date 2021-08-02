import type { InitShellType } from '@tiga-cli/tpl-core';
import { EMPTY_DEFAULT } from '.';
import eslint_prettier from './eslint_prettier';
import eslint_react from './eslint_react';
import eslint_typescript from './eslint_typescript';
import { ModuleDependencies } from './types';

const ESLINT_DEFAULT = {
  devDependencies: {
    eslint: '^7.30.0',
    'eslint-plugin-html': '^6.1.2',
    ...eslint_react.devDependencies
  },
  dependencies: {
    ...eslint_react.dependencies
  }
};

export default function eslint(options: InitShellType): ModuleDependencies {
  if (!options.eslint) return EMPTY_DEFAULT;
  const config = ESLINT_DEFAULT;
  if (options.prettier) {
    Object.assign(config.dependencies, eslint_prettier.dependencies);
    Object.assign(config.devDependencies, eslint_prettier.devDependencies);
  }
  if (options.typescript) {
    Object.assign(config.dependencies, eslint_typescript.dependencies);
    Object.assign(config.devDependencies, eslint_typescript.devDependencies);
  }
  return config;
}
