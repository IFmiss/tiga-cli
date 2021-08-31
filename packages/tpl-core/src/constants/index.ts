import { TypeCreateOptions, TypeCss, TypeLayout, TypeTemplate } from '../types';

export const INIT_FILE = 'init.json';
export const DEFAULT_PROT = 1994;
export const DEFAULT_HOST = '0.0.0.0';
export const NODE_MODULES_PATH = 'node_modules';

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
    description: 'react-components (React组件开发)',
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

export const FILE_NAME_MAP: {
  [props: string]: Partial<Record<'config' | 'ignore', string>>;
} = {
  babel: {
    config: '.babelrc.js'
  },
  git: {
    ignore: '.gitignore'
  },
  postcss: {
    config: 'postcss.config.js'
  },
  commitlint: {
    config: 'commitlint.config.js'
  },
  lintstaged: {
    config: 'lint-staged.config.js'
  },
  prettier: {
    config: 'prettier.config.js',
    ignore: '.prettierignore'
  },
  stylelint: {
    config: 'stylelint.config.js'
  },
  eslint: {
    config: '.eslintrc.js',
    ignore: '.eslintignore'
  },
  tiga: {
    config: 'tiga.config.js'
  },
  editconfig: {
    config: '.editorconfig'
  }
};
