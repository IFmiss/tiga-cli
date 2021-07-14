import type { InitShellType } from '@tiga-cli/tpl-core';
import react from './react';
import eslint from './eslint';
import less from './less';
import sass from './sass';
import postcss from './postcss';
import typescript from './typescript';
import babel from './babel';

export const pkg2Array = (pkg: { [props: string]: string }): Array<string> => {
  const arr = [];
  for (const [k, v] of Object.entries(pkg)) {
    arr.push(`${k}@${v}`);
  }
  return arr;
};

export const EMPTY_DEFAULT = {
  devDependencies: {},
  dependencies: {}
};

export default function (options: InitShellType) {
  const devDependencies = [
    ...pkg2Array(react.devDependencies),
    ...pkg2Array(eslint(options).devDependencies),
    ...(options?.css === 'less' ? pkg2Array(less.devDependencies) : []),
    ...(options?.css === 'sass' ? pkg2Array(sass.devDependencies) : []),
    ...pkg2Array(postcss(options).devDependencies),
    ...(options?.typescript ? pkg2Array(typescript.devDependencies) : []),
    ...pkg2Array(babel(options).devDependencies)
  ];
  const dependencies = [
    ...pkg2Array(react.dependencies),
    ...pkg2Array(eslint(options).dependencies),
    ...(options?.css === 'less' ? pkg2Array(less.dependencies) : []),
    ...(options?.css === 'sass' ? pkg2Array(sass.dependencies) : []),
    ...pkg2Array(postcss(options).dependencies),
    ...(options?.typescript ? pkg2Array(sass.dependencies) : []),
    ...pkg2Array(babel(options).dependencies)
  ];
}
