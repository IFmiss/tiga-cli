import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';
import styleLintScript from './../stylelint/script';
import eslintScript from './../eslint/script';
import prettierScript from './../prettier/script';
import lintAll from './../lintall/index';
import { renderRow } from '@tiga-cli/tpl-core';

export default function compilePostcssConfig(options: InitShellType): string {
  const { name, stylelint, eslint, prettier } = options;
  const str = `
    {
      "name": "${name}",
      "version": "0.0.1",
      "description": "demo spa",
      "main": "index.js",
      "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1",
        "serve": "webpack serve --config ./config/webpack.dev.js",
        ${row(styleLintScript, stylelint)}
        ${row(eslintScript, eslint)}
        ${row(prettierScript, prettier)}
        ${lintAll(options)}
        "pre-commit": "lint-staged"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        "prop-types": "^15.7.2",
        "react": "^17.0.2",
        "react-dom": "^17.0.2",
        "react-router": "^5.2.0",
        "react-router-dom": "^5.2.0"
      },
      "devDependencies": {
        "@babel/core": "^7.14.6",
        "@babel/plugin-transform-runtime": "^7.14.5",
        "@babel/preset-env": "^7.14.7",
        "@babel/preset-react": "^7.14.5",
        "@babel/preset-typescript": "^7.14.5",
        "@babel/runtime-corejs3": "^7.14.7",
        "@commitlint/cli": "^12.1.4",
        "@commitlint/config-conventional": "^12.1.4",
        "@types/react": "^17.0.14",
        "@types/react-dom": "^17.0.9",
        "@types/react-router-dom": "^5.1.8",
        "@typescript-eslint/eslint-plugin": "^4.28.2",
        "@typescript-eslint/parser": "^4.28.2",
        "autoprefixer": "^10.2.6",
        "babel-loader": "^8.2.2",
        "core-js": "^3.15.2",
        "css-loader": "^5.2.6",
        "eslint": "^7.30.0",
        "eslint-config-prettier": "^8.3.0",
        "eslint-plugin-html": "^6.1.2",
        "eslint-plugin-prettier": "^3.4.0",
        "eslint-plugin-react": "^7.24.0",
        "eslint-plugin-react-hooks": "^4.2.0",
        "file-loader": "^6.2.0",
        "html-webpack-plugin": "^5.3.2",
        "husky": "^7.0.1",
        "less": "^4.1.1",
        "less-loader": "^10.0.1",
        "lint-staged": "^11.0.0",
        "postcss-loader": "^6.1.1",
        "postcss-plugin-px2rem": "^0.8.1",
        "postcss-preset-env": "^6.7.0",
        "postcss-px-to-viewport": "^1.1.1",
        "prettier": "^2.3.2",
        "sass": "^1.35.2",
        "sass-loader": "^12.1.0",
        "style-loader": "^3.0.0",
        "stylelint": "^13.13.1",
        "stylelint-config-standard": "^22.0.0",
        "stylelint-order": "^4.1.0",
        "typescript": "^4.3.5",
        "url-loader": "^4.1.1",
        "webpack": "^5.42.1",
        "webpack-cli": "^4.7.2",
        "webpack-dev-server": "^3.11.2"
      }
    }
  `;
  return tpl(str);
}
