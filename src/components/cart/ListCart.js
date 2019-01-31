import React from 'react';
import {connect} from 'react-redux';
import { Table } from 'semantic-ui-react';
import IncrementButtons from './IncrementButtons';
import AddButton from '../cart/AddButton';
import {Utils} from "../../utils";
import {PropTypes} from 'prop-types';
/** @module Component ListCart
* this component list all items in the cart on datatable
*/
class ListCart extends React.Component {
  constructor(){
    super();
    this.state = {
      total : 0
    }
  }

/**render*/
  render(){
    /**
    * First check if cartItems have getItems
    * If is empty print a <div><p>Empty Cart</p></div>
    * Else list all the items
    */
    const { cartItems , quantityItem } = this.props;
    // console.log(cartItems)
    if(Object.keys(cartItems.items).length > 0){
      const total = cartItems.items.reduce( (cnt,o) => {return cnt + (o.price * o.quantity);}, 0)
      let table = cartItems.items.map((item)=>{
        return (
          <Table.Row>
            <Table.Cell>{item.description}</Table.Cell>
            <Table.Cell><input value={item.quantity} onChange={(ev)=>quantityItem(item,ev.target.value)}/></Table.Cell>
            <Table.Cell><IncrementButtons item={item} quantityItem={quantityItem} function={this.props.function} /></Table.Cell>
            <Table.Cell>{item.price} €</Table.Cell>
            <Table.Cell>{item.quantity > 0 ? (item.price * item.quantity).toFixed(2) +`€` : 0 + ' €'}</Table.Cell>
          </Table.Row>
        )
      })
      return (
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{this.context.t('description')}</Table.HeaderCell>
              <Table.HeaderCell>{this.context.t('quantity')}</Table.HeaderCell>
              {(this.props.canAdd)?<Table.HeaderCell></Table.HeaderCell>:null}
              <Table.HeaderCell>{this.context.t('price')}</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {table}
          </Table.Body>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              {(this.props.canAdd)?<Table.Cell></Table.Cell>:null}
              <Table.Cell><button>{Utils.translate('check-out-button')}</button></Table.Cell>
              <Table.Cell>Total: {(total).toFixed(2)} €</Table.Cell>
            </Table.Row>
        </Table>
      );
    }else{
      return (
        <div>
          <h1>{this.context.t('empty_cart')}</h1>
          {/** JUST FOR TESTING */}
          <AddButton item={{id:1,price:10,description:"esto"}} text={"buy"}/>
        </div>
      )
    }
  }
}
const mapStateToProps = state => ({
});

ListCart.contextTypes = {
    t: PropTypes.func.isRequired
}
export default connect(mapStateToProps)(ListCart);
