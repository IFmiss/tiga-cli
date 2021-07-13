import React, { memo } from 'react';
import { useParams, useLocation } from 'react-router';
import styles from './info.less';
// import PropTypes from 'prop-types';

export interface InfoProps {}

const Info: React.FC<InfoProps> = () => {
  const p = useParams<{ id: string }>();
  const l = useLocation();
  return (
    <div className={styles.info}>
      <p>this is Info</p>
      <p>path: {l.pathname}</p>
      <p>state: {JSON.stringify(l.state)}</p>
      <p>id: {p?.id}</p>
    </div>
  );
};

//Info.propTypes = {
//	props: PropTypes.string
//};

export default memo(Info);
