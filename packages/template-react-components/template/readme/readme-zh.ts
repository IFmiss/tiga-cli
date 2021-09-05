import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { name } = options;
  const str = `
    # ${name}

    react-components 组件

    ### yarn serve
    启动一个 webpack dev 服务

    ### yarn build
    打包组件库

    ### yarn build:site
    打包本地服务项目

    ### yarn release
    发包到npm

    ## 如何使用

    ### 直接引入
    \`\`\`js
    import { Loading } from '${name}';
    import '${name}/style/index.css'
    ...
    \`\`\`

    ### 按需引入: \`babel-plugin-import\`
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
