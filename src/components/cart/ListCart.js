import React from 'react';
import {connect} from 'react-redux';
import { Table } from 'semantic-ui-react';
import IncrementButtons from './IncrementButtons';
import AddButton from '../cart/AddButton';

class ListCart extends React.Component {
  constructor(){
    super();
    this.state = {
      total : 0
    }
  }


  render(){
    const { cartItems , onClick } = this.props;
    if(Object.keys(cartItems.items).length > 0){
      const total = cartItems.items.reduce( (cnt,o) => {return cnt + (o.price * o.quantity); }, 0)
      let table = cartItems.items.map((item)=>{
        return (
          <Table.Row>
            <Table.Cell>{item.description}</Table.Cell>
            <Table.Cell>{item.quantity}</Table.Cell>
            <Table.Cell><IncrementButtons item={item} onClick={onClick} function={this.props.function} /></Table.Cell>
            <Table.Cell>{item.price} €</Table.Cell>
            <Table.Cell>{(item.price * item.quantity).toFixed(2)} €</Table.Cell>
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
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              {(this.props.canAdd)?<Table.Cell></Table.Cell>:null}
              <Table.Cell><button>Confirm buy</button></Table.Cell>
              <Table.Cell>Total: {(total).toFixed(2)} €</Table.Cell>
            </Table.Row>
        </Table>
      );
    }else{
      return (
        <div>
          <h1>Empty Cart...</h1>
          {/** JUST FOR TESTING */}
          <AddButton item={{id:1,price:10,description:"esto"}} text={"buy"}/>
        </div>
      )
    }
  }
}
const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(ListCart);
