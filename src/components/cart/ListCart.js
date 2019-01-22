import React from 'react';
import {connect} from 'react-redux';
import { Table } from 'semantic-ui-react';
import IncrementButtons from './IncrementButtons';

class ListCart extends React.Component {
  constructor(){
    super();
  }

  render(){
    const { cartItems} = this.props;
    let table = cartItems.items.map((item)=>{
      return (
        <Table.Row>
          <Table.Cell>{item.description}</Table.Cell>
          <Table.Cell>
          {item.quantity}
          </Table.Cell>
          {(this.props.canAdd)?<Table.Cell><IncrementButtons item={item} onClick={this.props.onClick} /></Table.Cell>:null}
          <Table.Cell>{item.price}</Table.Cell>
          <Table.Cell>{item.price * item.quantity}</Table.Cell>
        </Table.Row>
      )
    })
    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            {(this.props.canAdd)?<Table.HeaderCell></Table.HeaderCell>:null}
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {table}
        </Table.Body>
      </Table>
    );
  }
}
const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(ListCart);
