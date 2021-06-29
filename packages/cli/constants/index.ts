type TypeTemplate = 'react-spa' | 'react-components';

type TypeLayoutTemplate = 'viewport' | 'rem';

export const INIT_FILE = 'init.json';

export const TEMPLATE_MAP: {
  [props in TypeTemplate]: string;
} = {
  'react-components': 'React组件',
  'react-spa': 'React单页面应用'
};

export const LAYOUT_MAP: {
  [props in TypeLayoutTemplate]: string;
} = {
  rem: '移动端rem解决方案',
  viewport: '移动端 viewport 适配解决方案'
};
