import { RouterView } from '@/router';
import React, { memo } from 'react';
import styles from './detail.less';
// import PropTypes from 'prop-types';

export interface DetailProps {}

const Detail: RFC<DetailProps> = ({ routes }) => {
  return (
    <h3 className={styles.detail}>
      this is detail
      <RouterView routes={routes}></RouterView>
    </h3>
  );
};

//Detail.propTypes = {
//	props: PropTypes.string
//};

export default memo(Detail);
