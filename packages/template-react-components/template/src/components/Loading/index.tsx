import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, styleExt, tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { typescript } = options;
  const sExt = styleExt(options);
  const str = `
    import PropTypes from 'prop-types';
    import React, { memo } from 'react';
    ${row(
      `
    export interface LoadingProps {
      text?: string;
    }`,
      typescript
    )}

    const Loading${
      typescript ? ': React.FC<LoadingProps>' : ''
    } = ({ text = 'loading ...' }) => {
      return <div className={'loading'}>{text}</div>;
    };

    Loading.propTypes = {
      text: PropTypes.string
    };

    export default memo(Loading);
  `;
  return tpl(str);
}
