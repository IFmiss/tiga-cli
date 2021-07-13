import { PROJECT_NAME } from '@/constants';
import React, { memo } from 'react';
import styles from './hello.less';
// import PropTypes from 'prop-types';

export interface HelloProps {}

const Hello: React.FC<HelloProps> = () => {
  return (
    <>
      <h3 className={styles.hello}>{PROJECT_NAME} 🥬</h3>
    </>
  );
};

//Hello.propTypes = {
//	props: PropTypes.string
//};

export default memo(Hello);
