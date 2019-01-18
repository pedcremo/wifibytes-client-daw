import React from 'react';
import {connect} from 'react-redux';
import { getItems } from '../../actions/cartActions';
import ListCart from './ListCart';


class Cart extends React.Component {
  constructor(){
    super();
  }

  render(){
    return (
      <ListCart cartItems={this.props.cartItems}/>
    );
  }
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(Cart);
