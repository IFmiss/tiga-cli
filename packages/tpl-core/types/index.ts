import type { TypeTemplate, TypeLayout, TypeCss, TypePkgTool } from 'tiga-cli';

export type InitShellType = {
  name: string;
  less?: boolean;
  stylus?: boolean;
  sass?: boolean;
  layout?: TypeLayout;
  typescript?: boolean;
  template?: TypeTemplate;
  pkgtool?: TypePkgTool;
  eslint?: boolean;
  prettier?: boolean;
  commitlint?: boolean;
  stylelint?: boolean;
  overwrite?: boolean;
  uuid?: string;
  runtimePath?: string;
  projectPath?: string;
  date?: string;
  templatePkg?: string;
};
