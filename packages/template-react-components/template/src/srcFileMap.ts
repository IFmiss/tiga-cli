import { InitShellType, styleExt, templateExt } from '@tiga-cli/tpl-core';

import compileApp from './app';
import components from './components/index';
import compileLoading from './components/Loading';
import importStyle from './components/Loading/style/import_style';
import loadingStyle from './components/Loading/style/loading_style';
import compileIndex from './index';
import html from './index_html';
import indexStyle from './index_style';

export default function srcFileMap(options: InitShellType) {
  const rExt = templateExt(options, { jsx: true });
  const tExt = templateExt(options);
  const sExt = styleExt(options);

  return {
    [`src/index.${rExt}`]: compileIndex(options),
    [`src/index.${sExt}`]: indexStyle(options),
    ['src/index.html']: html,
    [`src/app.${rExt}`]: compileApp(options),
    [`src/components/Loading/index.${rExt}`]: compileLoading(options),
    [`src/components/Loading/style/index.${sExt}`]: loadingStyle,
    [`src/components/Loading/style/index.${tExt}`]: importStyle,
    [`src/components/index.${tExt}`]: components
  };
}
