import React from 'react';
// import PropTypes from 'prop-types';
interface AaaProps {}
interface AaaState {}

class Aaa extends React.Component<AaaProps, AaaState> {
  constructor(props: Readonly<AaaProps>) {
    super(props);
    this.state = {};
  };
  componentDidMount () {
    // monunted
  };
  render () {
    return (
      <div className={styles.aaa}>this is Aaa</div>
    )
  }
};
//Aaa.propTypes = {
//	props: PropTypes.string
//};
export default Aaa;
  