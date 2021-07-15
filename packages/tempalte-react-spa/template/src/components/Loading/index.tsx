import React, { memo } from 'react';
import styles from './loading.less';
// import PropTypes from 'prop-types';

export interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return <div className={styles.loading}>loading ...</div>;
};

//Loading.propTypes = {
//	props: PropTypes.string
//};

export default memo(Loading);
