/** @module Component Cart
*/


import React from 'react';
import {connect} from 'react-redux';
import { getItems,  delete_item , quantityItem } from './cartActions';
import ListCart from './ListCart';

/** @class
* Component Container inside is ListCart and another components
*/
class Cart extends React.Component {
  /** constructor
  *
  */
  constructor(){
    super();
    this.state = {
      canAdd : true
    }
    this.quantityItem_ = this.quantityItem_.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  /**
   * Triggered when user click on +/- button
   * @param {id} item item's id to increment or decreases quantity
   */
  quantityItem_(item, quantity){
    this.props.dispatch(quantityItem(item,quantity))
  }
  /**
   * Triggered when user click on trash icon
   * @param {id} item item's id to remove from cartList
   */
  deleteItem(item){
    this.props.dispatch(delete_item(item))
  }

/** render */
  render(){
    return (
      <ListCart cartItems={this.props.cartItems} canAdd={this.state.canAdd} quantityItem={this.quantityItem_} function={this.deleteItem}/>
    );
  }
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(Cart);
