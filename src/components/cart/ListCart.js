import React from "react";
import { connect } from "react-redux";
import { Table, Input, Popup, Image } from "semantic-ui-react";
import IncrementButtons from "./IncrementButtons";
import AddButton from "../cart/AddButton";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

/** @module Component ListCart
 * this component list all items in the cart on datatable
 */
class ListCart extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0
    };
  }

  /**render*/
  render() {
    /**
     * First check if cartItems have getItems
     * If is empty print a <div><p>Empty Cart</p></div>
     * Else list all the items
     */
    const { cartItems, quantityItem } = this.props;
    if (Object.keys(cartItems.items).length > 0) {
      const total = cartItems.items.reduce((cnt, o) => {
        return cnt + o.price * o.quantity;
      }, 0);
      let table = cartItems.items.map(item => {
        return (
          <Table.Row key={item.id}>
            {item.imagen ? (
              <Table.Cell>
                <Popup
                  trigger={<p>{item.description}</p>}
                  content={<Image src={item.imagen} size="medium" />}
                  on="hover"
                />
              </Table.Cell>
            ) : (
              <Table.Cell>{item.description}</Table.Cell>
            )}
            <Table.Cell>
              <input
                value={item.quantity}
                onChange={ev => quantityItem(item, ev.target.value)}
              />
            </Table.Cell>
            <Table.Cell>
              <IncrementButtons
                item={item}
                quantityItem={quantityItem}
                function={this.props.function}
              />
            </Table.Cell>
            <Table.Cell>{item.price} €</Table.Cell>
            <Table.Cell>
              {item.quantity > 0
                ? (item.price * item.quantity).toFixed(2) + `€`
                : 0 + " €"}
            </Table.Cell>
          </Table.Row>
        );
      });
      return (
        <div className="listCart">
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  {this.context.t("description")}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {this.context.t("quantity")}
                </Table.HeaderCell>
                {this.props.canAdd ? <Table.HeaderCell /> : null}
                <Table.HeaderCell>{this.context.t("price")}</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{table}</Table.Body>
            <Table.Body>
              <Table.Row>
                <Table.Cell />
                <Table.Cell />
                {this.props.canAdd ? <Table.Cell /> : null}
                <Table.Cell />
              </Table.Row>
            </Table.Body>
          </Table>
          <div className="checkoutRedirect">
            <Link to="/checkout">
              <Input
                action={{
                  color: "teal",
                  labelPosition: "left",
                  icon: "cart",
                  content: this.context.t("check-out-button")
                }}
                actionPosition="left"
                defaultValue={total.toFixed(2) + " €"}
              />
              {total.toFixed(2) + " €"}
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>{this.context.t("empty_cart")}</h1>
          {/** JUST FOR TESTING */}
          <AddButton
            item={{ id: 1, price: 10, description: "esto" }}
            text={"buy"}
          />
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({});

ListCart.contextTypes = {
  t: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(ListCart);
