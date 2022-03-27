import type { InitShellType } from '@tiga-cli/tpl-core';

import babel from './babel';
import commitlint from './commitlint';
import eslint from './eslint';
import less from './less';
import lintStaged from './lint-staged';
import postcss from './postcss';
import prettier from './prettier';
import react from './react';
import sass from './sass';
import stylelint from './stylelint';
import stylus from './stylus';
import tiga from './tiga';
import { GeneralModuleDependencies } from './types';
import typescript from './typescript';
import webpack from './webpack';

export const pkg2Array = (pkg: { [props: string]: string }): Array<string> => {
  const arr: Array<string> = [];
  for (const [k, v] of Object.entries(pkg)) {
    arr.push(`"${k}": "${v}"`);
  }
  return arr;
};

export const EMPTY_DEFAULT = {
  devDependencies: {},
  dependencies: {}
};

export default function pkgDependencies(
  options: InitShellType
): GeneralModuleDependencies<Array<string>> {
  const {
    less: lessOpt,
    sass: sassOpt,
    stylus: stylusOpt,
    typescript: typescriptOpt,
    stylelint: stylelintOpt,
    commitlint: commitlintOpt,
    eslint: eslintOpt,
    prettier: prettierOpt
  } = options;

  const devDependencies = {
    ...react.devDependencies,
    ...babel(options).devDependencies,
    ...webpack.devDependencies,
    ...postcss(options).devDependencies,
    ...tiga(options).devDependencies,
    ...(eslintOpt ? eslint(options).devDependencies : {}),
    ...(lessOpt ? less.devDependencies : {}),
    ...(sassOpt ? sass.devDependencies : {}),
    ...(stylusOpt ? stylus.devDependencies : {}),
    ...(typescriptOpt ? typescript.devDependencies : {}),
    ...(stylelintOpt ? stylelint.devDependencies : {}),
    ...(commitlintOpt ? commitlint.devDependencies : {}),
    ...(commitlintOpt ? lintStaged.devDependencies : {}),
    ...(prettierOpt ? prettier.devDependencies : {})
  };
  const dependencies = {
    ...react.dependencies,
    ...babel(options).dependencies,
    ...webpack.dependencies,
    ...postcss(options).dependencies,
    ...tiga(options).dependencies,
    ...(eslintOpt ? eslint(options).dependencies : {}),
    ...(lessOpt ? less.dependencies : {}),
    ...(sassOpt ? sass.dependencies : {}),
    ...(stylusOpt ? stylus.dependencies : {}),
    ...(typescriptOpt ? typescript.dependencies : {}),
    ...(stylelintOpt ? stylelint.dependencies : {}),
    ...(commitlintOpt ? commitlint.dependencies : {}),
    ...(commitlintOpt ? lintStaged.dependencies : {}),
    ...(prettierOpt ? prettier.dependencies : {})
  };

  return {
    devDependencies: pkg2Array(devDependencies),
    dependencies: pkg2Array(dependencies)
  };
}

export function dependencies2Str(
  options: InitShellType
): GeneralModuleDependencies<string> {
  const pkg = pkgDependencies(options);
  return {
    devDependencies: pkg.devDependencies.join(' '),
    dependencies: pkg.dependencies.join(' ')
  };
}
