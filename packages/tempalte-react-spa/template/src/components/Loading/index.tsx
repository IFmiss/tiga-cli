import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compileComponent(options: InitShellType): string {
  const { typescript } = options;
  const str = `
    import React, { memo } from 'react';
    import styles from './loading.less';
    import PropTypes from 'prop-types';
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
      return <div className={styles.loading}>{text}</div>;
    };

    Loading.propTypes = {
      text: PropTypes.string
    };

    export default memo(Loading);
  `;
  return tpl(str, {
    endNewline: true
  });
}
