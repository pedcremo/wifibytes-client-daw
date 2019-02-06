import React from 'react';
import {connect} from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
/** @module Component IncrementButtons
* this component print buttons to increment, decrease or delete an item
*/
class IncrementButtons extends React.Component{
  constructor(){
    super();
  }
  /** render*/
  render(){
    /**
    *Print button +1, set quantity of the item + 1
    *Print button -1, set quantitu of the item -1
    *Delete button, delete this item from the cart list
    */
    return(
      <Button.Group icon>
        <Button size="mini" onClick={() => this.props.quantityItem(this.props.item, this.props.item.quantity + 1)}>
          <Icon name='add' />
        </Button>
        <Button size='mini' onClick={() => this.props.quantityItem(this.props.item, this.props.item.quantity - 1)}>
          <Icon name='minus' />
        </Button>
        <Button size='mini' onClick={() => this.props.function(this.props.item)}>
          <Icon name='trash' />
        </Button>
      </Button.Group>
    )
  }
}

export default IncrementButtons
