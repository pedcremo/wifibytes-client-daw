/** @module Component AddButton
*/

import React from 'react';
import {connect} from 'react-redux';
import {setItem,getItems} from '../../actions/cartActions'


/** @class
* Draw a button to add items or rates at cart
*/
class AddButton extends React.Component {

  /** constructor
  *
  */
  constructor(){
    super();
    this.addItem = () => ev =>{
        ev.preventDefault();
        let item = {
          id : this.props.id /* id item*/,
          description : this.props.description,
          price : this.props.price,
          quantity : 1
        }
        this.props.dispatch(setItem(item));
    }
  }
  /** render */
  render(){
    const { cart } = this.props;

    return (
        <button className="btn btn-secondary" onClick={this.addItem()}>{this.props.text}{cart.items ? cart.items.length : ''}</button>
    );
  }
}

const mapStateToProps = state => ({
  cart: getItems()
});

export default connect(mapStateToProps)(AddButton);
