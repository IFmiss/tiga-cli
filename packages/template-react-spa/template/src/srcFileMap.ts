import { InitShellType, styleExt } from '@tiga-cli/tpl-core';

import compileApp from './app';
import compileHello from './components/Hello';
import helloStyle from './components/Hello/hello_style';
import compileLoading from './components/Loading';
import loadingStyle from './components/Loading/loading_style';
import compileIndex from './index';
import html from './index_html';
import indexStyle from './index_style';
import compileModulesInfo from './modules/detail/info';
import modulesInfoStyle from './modules/detail/info/info_style';
import compileDetail from './pages/detail';
import detailStyle from './pages/detail/detail_style';
import compileHome from './pages/home';
import homeStyle from './pages/home/home_style';
import routerConfig from './router/config';
import routerComponent from './router/index';
import routerDeclaration from './router/router_declaration';

export default function srcFileMap(options: InitShellType) {
  const { typescript } = options;
  const rExt = typescript ? 'tsx' : 'jsx';
  const sExt = styleExt(options);

  return {
    [`src/index.${rExt}`]: compileIndex(options),
    [`src/index.${sExt}`]: indexStyle(options),
    ['src/index.html']: html,
    [`src/app.${rExt}`]: compileApp(options),
    [`src/router/config.${rExt}`]: routerConfig(options),
    [`src/router/index.${rExt}`]: routerComponent(options),
    ...(typescript ? { ['src/router/router.d.ts']: routerDeclaration } : null),
    [`src/pages/home/index.${rExt}`]: compileHome(options),
    [`src/pages/home/home.${sExt}`]: homeStyle,
    [`src/pages/detail/index.${rExt}`]: compileDetail(options),
    [`src/pages/detail/detail.${sExt}`]: detailStyle,
    [`src/modules/detail/info/index.${rExt}`]: compileModulesInfo(options),
    [`src/modules/detail/info/info.${sExt}`]: modulesInfoStyle,
    [`src/components/Hello/index.${rExt}`]: compileHello(options),
    [`src/components/Hello/hello.${sExt}`]: helloStyle,
    [`src/components/Loading/index.${rExt}`]: compileLoading(options),
    [`src/components/Loading/loading.${sExt}`]: loadingStyle
  };
}
