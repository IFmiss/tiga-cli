import babel_typescript from './babel_typescript';
import type { InitShellType } from '@tiga-cli/tpl-core';

const BABEL_DEFAULT = {
  devDependencies: {
    '@babel/core': '^7.14.6',
    '@babel/plugin-transform-runtime': '^7.14.5',
    '@babel/preset-env': '^7.14.7',
    '@babel/preset-react': '^7.14.5',
    '@babel/runtime-corejs3': '^7.14.7',
    'core-js': '^3.15.2',
    'babel-loader': '^8.2.2'
  },
  dependencies: {}
};

export default function babel(options: InitShellType) {
  const { typescript } = options;
  return {
    devDependencies: {
      ...BABEL_DEFAULT.devDependencies,
      ...(typescript ? babel_typescript.devDependencies : {})
    },
    dependencies: {
      ...BABEL_DEFAULT.dependencies,
      ...(typescript ? babel_typescript.dependencies : {})
    }
  };
}
