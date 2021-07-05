"use strict";
exports.__esModule = true;
exports.DEFAULT_CREATE_OPTOPNS = exports.CSS_MAP = exports.LAYOUT_MAP = exports.TEMPLATE_MAP = exports.INIT_FILE = void 0;
exports.INIT_FILE = 'init.json';
exports.TEMPLATE_MAP = {
    'react-components': {
        description: 'react-components (React组件开发)',
        pkg: 'tiga-cli-template/react-spa'
    },
    'react-spa': {
        description: 'react-spa (React单页面应用)',
        pkg: 'tiga-cli-template/react-spa'
    }
};
exports.LAYOUT_MAP = {
    px: 'px 通用场景',
    viewport: 'viewport 适配方案',
    rem: 'rem 适配方案'
};
exports.CSS_MAP = {
    less: 'less + css moudles',
    scss: 'scss + css moudles',
    stylus: 'stylus + css moudles',
    'style-component': 'style-component'
};
exports.DEFAULT_CREATE_OPTOPNS = {
    name: 'tiga-test',
    git: false,
    typescript: true,
    css: 'less',
    layout: 'px',
    template: 'react-spa',
    pkgtool: 'pnpm',
    lint: ['eslint', 'prettier', 'stylelint', 'commitlint']
};
