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
};

export type RenderTemplateOptions = {
  uuid: string;
  templatePkg: string;
  date: string;
  runtimePath: string;
  projectPath: string;
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
};
