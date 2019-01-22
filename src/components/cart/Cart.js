import React from 'react';
import {connect} from 'react-redux';
import { getItems, increment_item } from '../../actions/cartActions';
import ListCart from './ListCart';


class Cart extends React.Component {
  constructor(){
    super();
    this.state = {
      canAdd : true
    }
    this.incrementItem = this.incrementItem.bind(this);
  }

  incrementItem(item, quantity){
    item.quantity_item = quantity;
    this.props.dispatch(increment_item(item))
  }

  render(){
    return (
      <ListCart cartItems={this.props.cartItems} canAdd={this.state.canAdd} onClick={this.incrementItem}/>
    );
  }
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(Cart);
