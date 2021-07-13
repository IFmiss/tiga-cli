import { fmtUpStart } from '../utils/str';
import tplExp from '../utils/tplExp';
import type { RenderTemplateOptions } from 'tiga-cli';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compileIndex(options: InitShellType): string {
  const { name, css, typescript } = options;

  const lowerName = name.toLocaleLowerCase();
  const upStartName = fmtUpStart(name);

  const tpl = `
    import React from 'react';
    // import PropTypes from 'prop-types';
    ${typescript ? `interface ${upStartName}Props {}` : `--rm-row--`}
    ${typescript ? `interface ${upStartName}State {}\n` : `--rm-row--`}
    class ${upStartName} extends React.Component${
    typescript ? `<${upStartName}Props, ${upStartName}State>` : ''
  } {
      constructor(props${typescript ? `: Readonly<${upStartName}Props>` : ''}) {
        super(props);
        this.state = {};
      };
      componentDidMount () {
        // monunted
      };
      render () {
        return (
          <div className={styles.${lowerName}}>this is ${upStartName}</div>
        )
      }
    };
    //${upStartName}.propTypes = {
    //	props: PropTypes.string
    //};
    export default ${upStartName};
  `;
  return tplExp(tpl);
}
