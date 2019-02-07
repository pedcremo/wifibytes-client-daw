import React from 'react'
import { connect } from "react-redux";
import {PropTypes} from 'prop-types';

const mapStateToProps = state => ({ ...state });

class Resume extends React.Component {
  

  componentDidMount() {
    //this.props.dispatch(getPaymentTypes());
  }

  render() {
    console.log(this);

    return (
        <p>Resumen</p>
    );

  }
}

Resume.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Resume);