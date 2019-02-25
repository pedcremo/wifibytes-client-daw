/** @module Component Cart
 */
import React from 'react';
import { connect } from 'react-redux';
import { getItems, delete_item, quantityItem } from './cartActions';
import ListCart from './ListCart';

/** @class
 * Component Container inside is ListCart and another components
 */
class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			canAdd: true
		};
		this.quantityItem_ = this.quantityItem_.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.props.onLoad();
	}
	/**
   * Triggered when user click on +/- button
   * @param {id} item item's id to increment or decreases quantity
   * @param {int} quantity take the quantity of the object and modify it
   */
	quantityItem_(item, quantity) {
		this.props.quantityItem(item, quantity);
	}
	/**
   * Triggered when user click on trash icon
   * @param {id} item item's id to remove from cartList
   */
	deleteItem(item) {
		this.props.deleteItem(item);
	}

  /** render */
  render() {
    return (
      <ListCart
        cartItems={this.props.cartItems}
        canAdd={this.state.canAdd}
        quantityItem={this.quantityItem_}
        function={this.deleteItem}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
	onLoad: () => dispatch(getItems()),
	quantityItem: (item, quantity) => dispatch(quantityItem(item, quantity)),
	deleteItem: (item) => dispatch(delete_item(item))
});
const mapStateToProps = (state) => ({
	cartItems: state.cartReducer
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
