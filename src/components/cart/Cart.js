import React from 'react';
import {connect} from 'react-redux';
import { getItems } from '../../actions/cartActions';
import ListCart from './ListCart';


class Cart extends React.Component {
  constructor(){
    super();
  }

  componentDidMount() {
      this.props.dispatch(getItems());
      console.log(this.props.cartItems);
  }

  render(){
    return (
      <ListCart />
    );
  }
}

const mapStateToProps = state => ({
    items: state.items
});
export default connect(mapStateToProps)(Cart);
