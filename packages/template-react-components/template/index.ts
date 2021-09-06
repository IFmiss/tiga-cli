import {
  commitlintConfig,
  editorConfig,
  eslintConfig,
  eslintIgnore,
  gitIgnore,
  lintstagedConfig,
  postcssConfig,
  prettierConfig,
  prettierIgnore,
  stylelintConfig,
  tigaConfig,
  vscodeTplMap
} from '@tiga-cli/template-generic';
import { FILE_NAME_MAP as f, InitShellType } from '@tiga-cli/tpl-core';

// import commitlintConfig from './template/commitlint/config';
import babelConfig from './babel/config';
import declaration from './declaration/index';
import gulp from './gulp/config';
import packageJson from './pkg/index';
import readme from './readme/readme';
import readmeZH from './readme/readme-zh';
import srcFileMap from './src/srcFileMap';
import tsConfig from './typescript/config';
import webpackBase from './webpack/base.config';
import webpackDev from './webpack/dev.config';
import webpackProd from './webpack/prod.config';

export default function templateMap(options: InitShellType) {
  const { typescript, eslint, commitlint, prettier, stylelint } = options;

  const TPL_MAP = {
    [`${f.babel.config}`]: babelConfig(options),
    [`${f.git.ignore}`]: gitIgnore,
    [`${f.postcss.config}`]: postcssConfig(options),
    ['README.md']: readme(options),
    ['README-zh.md']: readmeZH(options),
    [`${f.tiga.config}`]: tigaConfig(options),
    ['package.json']: packageJson(options),
    ['gulpfile.js']: gulp,
    ['config/webpack.base.config.js']: webpackBase(options),
    ['config/webpack.dev.config.js']: webpackDev(options),
    ['config/webpack.prod.config.js']: webpackProd(options),
    [`${f.editconfig.config}`]: editorConfig,
    ...srcFileMap(options),
    ...vscodeTplMap()
  };

  if (commitlint) {
    Object.assign(TPL_MAP, {
      [`${f.commitlint.config}`]: commitlintConfig,
      [`${f.lintstaged.config}`]: lintstagedConfig(options)
    });
  }

  if (prettier) {
    Object.assign(TPL_MAP, {
      [`${f.prettier.config}`]: prettierConfig,
      [`${f.prettier.ignore}`]: prettierIgnore(options)
    });
  }

  if (stylelint) {
    Object.assign(TPL_MAP, {
      [`${f.stylelint.config}`]: stylelintConfig
    });
  }

  if (eslint) {
    Object.assign(TPL_MAP, {
      [`${f.eslint.config}`]: eslintConfig(options),
      [`${f.eslint.ignore}`]: eslintIgnore
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
