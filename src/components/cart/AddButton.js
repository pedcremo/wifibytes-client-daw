/** @module Component AddButton
*/

import React from 'react';
import {connect} from 'react-redux';
import {setItem,getItems} from './cartActions'
import PropTypes from 'prop-types'

/** @class
* Draw a button to add items or rates at cart
*/
class AddButton extends React.Component {

  /** constructor
  *
  */
  constructor(){
    super();
    this.addItem = this.addItem.bind(this);
  }

  /**
   * AddItem Will store the current Prop item to the State
   */
  addItem(ev){
    ev.preventDefault();
    this.props.dispatch(setItem(this.props.item));
  }

  /** render */
  render(){
    const { cart , item} = this.props;

    return (
        <button className="btn btn-secondary" onClick={(ev)=>this.addItem(ev)}>{this.props.text}</button>
    );
  }
}
/**
 * PropType is a kind of validation for Props incoming
 * 
 * We are validating the required information we globaly use to make the listing of cart
 */
AddButton.propTypes = {
  item : PropTypes.shape({
    id: PropTypes.any.isRequired,
    description : PropTypes.string.isRequired,
    price : PropTypes.number.isRequired
  }),
  text : PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  cart: getItems()
});

export default connect(mapStateToProps)(AddButton);
