import { TypeCreateOptions, TypeCss, TypeLayout, TypeTemplate } from '../types';

export const INIT_FILE = 'init.json';

export const TEMPLATE_MAP: {
  [props in TypeTemplate]: {
    description: string;
    pkg: string;
  };
} = {
  'react-spa': {
    description: 'react-spa (React单页面应用)',
    pkg: '@tiga-cli/template-react-spa'
  },
  'react-components': {
    description: 'react-components (React组件开发) [暂不支持]',
    pkg: '@tiga-cli/template-react-components'
  }
};

export const LAYOUT_MAP: {
  [props in TypeLayout]: string;
} = {
  px: 'px 通用场景',
  viewport: 'viewport 适配方案'
};

export const CSS_MAP: {
  [props in TypeCss]: string;
} = {
  less: 'less + css moudles',
  sass: 'scss + css moudles',
  stylus: 'stylus + css moudles'
};

export const LINT_ENUM = ['eslint', 'prettier', 'commitlint', 'stylelint'];

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
