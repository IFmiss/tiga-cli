export type TypeTemplate = 'react-spa' | 'react-components';

export type TypeLayout = 'px' | 'viewport';

export type TypeCss = 'less' | 'sass' | 'stylus';

export type TypePkgTool = 'pnpm' | 'yarn' | 'npm';

export type TypeLint = 'eslint' | 'prettier' | 'commitlint' | 'stylelint';

export type TypeCreateOptions = {
  name: string;
  git: boolean;
  typescript: boolean;
  css: TypeCss;
  layout: TypeLayout;
  template: TypeTemplate;
  pkgtool: TypePkgTool;
  lint: Array<TypeLint>;
  version?: string;
};

export type RenderTemplateOptions = {
  uuid: string;
  templatePkg: string;
  date: string;
  runtimePath: string;
  projectPath: string;
  initFile?: string;
} & TypeCreateOptions;

export type InitShellType = {
  name: string;
  less?: boolean;
  stylus?: boolean;
  sass?: boolean;
  git?: boolean;
  layout?: TypeLayout;
  typescript?: boolean;
  template?: TypeTemplate;
  pkgtool: TypePkgTool;
  eslint?: boolean;
  prettier?: boolean;
  commitlint?: boolean;
  stylelint?: boolean;
  overwrite?: boolean;
  uuid?: string;
  runtimePath?: string;
  projectPath: string;
  date?: string;
  templatePkg?: string;
  initFile?: string;
  version?: string;
};

export type TigaConfig = {
  type: TypeTemplate;
  devtool?: string;
  favicon?: string;
  outputPath?: string;
  publicPath?: string;
  proxy?: any;
  chainWebpack?: any;
  alias?: any;
  devServer: {
    cert?: boolean;
    port?: number | string;
    host?: string;
    open?: boolean;
    https?: boolean;
  };
};

export type BaseServeOptions = Partial<{
  port: string;
  open: boolean;
}>;

export type WebpackServeOptions = BaseServeOptions & {
  config?: string;
};

export type BaseBuildOptions = {
  config?: string;
  component?: boolean;
};

export type WebpackBuildOptions = BaseBuildOptions & {};

export type GulpBuildOptions = BaseBuildOptions & {};

export type BuildOptions = WebpackBuildOptions | GulpBuildOptions;

export type RepoPublishType =
  | 'premajor'
  | 'preminor'
  | 'prepatch'
  | 'prerelease'
  | 'major'
  | 'minor'
  | 'patch';
