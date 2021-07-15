import { renderContextFile, tpl } from '@tiga-cli/tpl-core';
import commitlintConfig from './template/commitlint/config';
import eslintIgnore from './template/eslint/ignore';
import babelConfig from './template/babel/config';
import eslintConfig from './template/eslint/config';
import gitIgnore from './template/git/ignore';
import liststagedConfig from './template/lintstaged/config';
import prettierConfig from './template/prettier/config';
import prettierIgnore from './template/prettier/igonre';
import stylelintConfig from './template/stylelint/config';
import postcssConfig from './template/postcss/config';
import readme from './template/readme/readme';
import readmeZH from './template/readme/readme-zh';
import tiga from './template/tiga/index';
import tsConfig from './template/typescript/config';
import packageJson from './template/pkg/index';
import declaration from './template/declaration/index';
import compileIndex from './template/src/index';
import indexStyle from './template/src/index_style';
import html from './template/src/index_html';
import compileApp from './template/src/app';
import routerConfig from './template/src/router/config';
import routerComponent from './template/src/router/index';
import routerDeclaration from './template/src/router/router_declaration';

// import pkg from './template/package.json';
import * as fsExtra from 'fs-extra';
import { InitShellType } from '@tiga-cli/tpl-core';

export default function renderRCC(options: InitShellType) {
  const { projectPath, typescript, css } = options;

  const reactExt = typescript ? 'tsx' : 'jsx';
  const styleExt = css;

  const TPL_MAP = {
    [`.commitlintrc.js`]: commitlintConfig,
    ['.eslintignore']: eslintIgnore,
    ['.babelrc.js']: babelConfig(options),
    ['.eslintrc.js']: eslintConfig(options),
    ['.gitignore']: gitIgnore,
    ['.lintstagedrc.js']: liststagedConfig(options),
    ['.prettierrc.js']: prettierConfig,
    ['.prettierignore']: prettierIgnore(options),
    ['.stylelintrc.js']: stylelintConfig,
    ['postcss.config.js']: postcssConfig(options),
    ['README.md']: readme(options),
    ['README-zh.md']: readmeZH(options),
    ['tiga.config.js']: tiga(options),
    ['tsconfig.json']: tsConfig,
    ['package.json']: packageJson(options),
    ...(typescript ? { ['src/global.d.ts']: declaration } : null),
    [`src/index.${reactExt}`]: compileIndex(),
    [`src/index.${styleExt}`]: indexStyle,
    ['src/index.html']: html,
    [`src/app.${reactExt}`]: compileApp(options),
    [`src/router/config.${reactExt}`]: routerConfig(options),
    [`src/router/index.${reactExt}`]: routerComponent,
    ...(typescript ? { ['src/router/router.d.ts']: routerDeclaration } : null)
    // [`package.json`]: JSON.stringify(pkg, null, 2)
  };

  for (const [k, v] of Object.entries(TPL_MAP)) {
    try {
      fsExtra.writeFileSync(`${projectPath}/${k}`, v, 'UTF-8');
    } catch (e) {
      console.error(e);
      fsExtra.rmdir(projectPath);
    }
  }
}
