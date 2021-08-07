import type { InitShellType } from '@tiga-cli/tpl-core';
import react from './react';
import eslint from './eslint';
import less from './less';
import sass from './sass';
import stylus from './stylus';
import postcss from './postcss';
import typescript from './typescript';
import babel from './babel';
import webpack from './webpack';
import lintStaged from './lint-staged';
import commitlint from './commitlint';
import stylelint from './stylelint';
import prettier from './prettier';
import tiga from './tiga';
import { GeneralModuleDependencies } from './types';

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

  const devDependencies = [
    ...pkg2Array(react.devDependencies),
    ...pkg2Array(babel(options).devDependencies),
    ...pkg2Array(webpack.devDependencies),
    ...pkg2Array(postcss(options).devDependencies),
    ...pkg2Array(tiga.devDependencies),
    ...(eslintOpt ? pkg2Array(eslint(options).devDependencies) : []),
    ...(lessOpt ? pkg2Array(less.devDependencies) : []),
    ...(sassOpt ? pkg2Array(sass.devDependencies) : []),
    ...(stylusOpt ? pkg2Array(stylus.devDependencies) : []),
    ...(typescriptOpt ? pkg2Array(typescript.devDependencies) : []),
    ...(stylelintOpt ? pkg2Array(stylelint.devDependencies) : []),
    ...(commitlintOpt ? pkg2Array(commitlint.devDependencies) : []),
    ...(commitlintOpt ? pkg2Array(lintStaged.devDependencies) : []),
    ...(prettierOpt ? pkg2Array(prettier.devDependencies) : [])
  ];
  const dependencies = [
    ...pkg2Array(react.dependencies),
    ...pkg2Array(babel(options).dependencies),
    ...pkg2Array(webpack.dependencies),
    ...pkg2Array(postcss(options).dependencies),
    ...pkg2Array(tiga.dependencies),
    ...(eslintOpt ? pkg2Array(eslint(options).dependencies) : []),
    ...(lessOpt ? pkg2Array(less.dependencies) : []),
    ...(sassOpt ? pkg2Array(sass.dependencies) : []),
    ...(stylusOpt ? pkg2Array(stylus.dependencies) : []),
    ...(typescriptOpt ? pkg2Array(typescript.dependencies) : []),
    ...(stylelintOpt ? pkg2Array(stylelint.dependencies) : []),
    ...(commitlintOpt ? pkg2Array(commitlint.dependencies) : []),
    ...(commitlintOpt ? pkg2Array(lintStaged.dependencies) : []),
    ...(prettierOpt ? pkg2Array(prettier.dependencies) : [])
  ];

  return {
    devDependencies: devDependencies,
    dependencies
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
