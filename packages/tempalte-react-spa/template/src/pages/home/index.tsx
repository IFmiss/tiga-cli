import React, { memo } from 'react';
import styles from './home.less';
// import PropTypes from 'prop-types';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return <h3 className={styles.home}>this is home</h3>;
};

//Home.propTypes = {
//	props: PropTypes.string
//};

export default memo(Home);
