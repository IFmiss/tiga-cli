import type { InitShellType } from '@tiga-cli/tpl-core';
import { tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { name } = options;
  const str = `
    # ${name}

    this is react components project

    ### yarn serve
    start webpack dev server

    ### yarn build
    build react components

    ### yarn build:site
    build react demo site

    ### yarn release
    publish package to npm

    ## How to use

    ### Direct introduction
    \`\`\`js
    import { Loading } from '${name}';
    import '${name}/style/index.css'
    ...
    \`\`\`

    ### use dynamic introduction: \`babel-plugin-import\`
    \`\`\`code
    npm i babel-plugin-import --save-dev
    \`\`\`

    \`\`\`js
    [
      'import',
      { libraryName: '${name}', libraryDirectory: 'dist/esm' },
      '${name}'
    ];
    \`\`\`
  `;
  return tpl(str);
}
