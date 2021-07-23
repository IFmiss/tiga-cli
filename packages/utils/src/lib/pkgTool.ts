import { TypePkgTool } from '@tiga-cli/tpl-core';

type ToolCmdType = 'install' | 'run' | 'add';

const INSTALL_MAP: {
  [k in TypePkgTool]: {
    [p in ToolCmdType]: string;
  };
} = {
  yarn: {
    run: 'yarn',
    install: 'yarn',
    add: 'yarn add'
  },
  npm: {
    run: 'npm run',
    install: 'npm install',
    add: 'npm install'
  },
  pnpm: {
    run: 'pnpm',
    install: 'pnpm install',
    add: 'pnpm install'
  }
};

export function add(tool: TypePkgTool) {
  return INSTALL_MAP[tool].add;
}

export function intall(tool: TypePkgTool) {
  return INSTALL_MAP[tool].install;
}

export function run(tool: TypePkgTool) {
  return INSTALL_MAP[tool].run;
}
