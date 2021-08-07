import { InitShellType } from '@tiga-cli/tpl-core';

import {
  commitlintConfig,
  gitIgnore,
  eslintIgnore,
  eslintConfig,
  prettierConfig,
  prettierIgnore,
  stylelintConfig,
  postcssConfig,
  tigaConfig,
  lintstagedConfig,
  vscodeTplMap
} from '@tiga-cli/template-generic';

// import commitlintConfig from './template/commitlint/config';
import babelConfig from './babel/config';
import readme from './readme/readme';
import readmeZH from './readme/readme-zh';
import tsConfig from './typescript/config';
import packageJson from './pkg/index';
import declaration from './declaration/index';
import webpackBase from './webpack/base.config';
import webpackDev from './webpack/dev.config';
import webpackProd from './webpack/prod.config';
import srcFileMap from './src/srcFileMap';

export default function templateMap(options: InitShellType) {
  const { typescript, eslint, commitlint, prettier, stylelint } = options;

  const TPL_MAP = {
    ['.babelrc.js']: babelConfig(options),
    ['.gitignore']: gitIgnore,
    ['postcss.config.js']: postcssConfig(options),
    ['README.md']: readme(options),
    ['README-zh.md']: readmeZH(options),
    ['tiga.config.js']: tigaConfig(options),
    ['package.json']: packageJson(options),
    ['config/webpack.base.config.js']: webpackBase(options),
    ['config/webpack.dev.config.js']: webpackDev(options),
    ['config/webpack.prod.config.js']: webpackProd(options),
    ...srcFileMap(options),
    ...vscodeTplMap()
  };

  if (commitlint) {
    Object.assign(TPL_MAP, {
      [`.commitlintrc.js`]: commitlintConfig,
      ['.lintstagedrc.js']: lintstagedConfig(options)
    });
  }

  if (prettier) {
    Object.assign(TPL_MAP, {
      ['.prettierrc.js']: prettierConfig,
      ['.prettierignore']: prettierIgnore(options)
    });
  }

  if (stylelint) {
    Object.assign(TPL_MAP, {
      ['.stylelintrc.js']: stylelintConfig
    });
  }

  if (eslint) {
    Object.assign(TPL_MAP, {
      ['.eslintrc.js']: eslintConfig(options),
      ['.eslintignore']: eslintIgnore
    });
  }

  if (typescript) {
    Object.assign(TPL_MAP, {
      ['src/global.d.ts']: declaration,
      ['tsconfig.json']: tsConfig
    });
  }

  return TPL_MAP;
}
