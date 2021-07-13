export type TypeTemplate = 'react-spa' | 'react-components';

export type TypeLayout = 'px' | 'viewport' | 'rem';

export type TypeCss = 'less' | 'scss' | 'stylus' | 'style-component';

export type TypePkgTool = 'pnpm' | 'yarn' | 'npm';

export type TypeLint = 'eslint' | 'prettier' | 'commitlint' | 'stylelint';

export const INIT_FILE = 'init.json';

export const TEMPLATE_MAP: {
  [props in TypeTemplate]: {
    description: string;
    pkg: string;
  };
} = {
  'react-components': {
    description: 'react-components (React组件开发)',
    pkg: 'tiga-cli-template/react-spa'
  },
  'react-spa': {
    description: 'react-spa (React单页面应用)',
    pkg: 'tiga-cli-template/react-spa'
  }
};

export const LAYOUT_MAP: {
  [props in TypeLayout]: string;
} = {
  px: 'px 通用场景',
  viewport: 'viewport 适配方案',
  rem: 'rem 适配方案'
};

export const CSS_MAP: {
  [props in TypeCss]: string;
} = {
  less: 'less + css moudles',
  scss: 'scss + css moudles',
  stylus: 'stylus + css moudles',
  'style-component': 'style-component'
};

export type TypeCreateOptions = {
  name: string;
  git: boolean;
  typescript: boolean;
  css: TypeCss;
  layout: TypeLayout;
  template: TypeTemplate;
  pkgtool: TypePkgTool;
  lint: Array<TypeLint>;
};

export const DEFAULT_CREATE_OPTOPNS: TypeCreateOptions = {
  name: 'tiga-test',
  git: false,
  typescript: true,
  css: 'less',
  layout: 'px',
  template: 'react-spa',
  pkgtool: 'pnpm',
  lint: ['eslint', 'prettier', 'stylelint', 'commitlint']
};

export type RenderTemplateOptions = {
  uuid: string;
  templatePkg: string;
  date: string;
  runtimePath: string;
  projectPath: string;
} & TypeCreateOptions;
