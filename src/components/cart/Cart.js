import React from 'react';
import {connect} from 'react-redux';
import { Table } from 'semantic-ui-react';
import { getItems } from '../../actions/cartActions';
import ListCart from './ListCart';


class Cart extends React.Component {
  constructor(){
    super();
  }

  componentWillMount() {
      this.props.dispatch(getItems());
  }

  render(){
    return (
      <ListCart />
    );
  }
}

const mapStateToProps = state => ({
    //items: state.items
});
export default connect(mapStateToProps)(Cart);
