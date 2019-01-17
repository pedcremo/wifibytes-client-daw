import React from 'react';
import {connect} from 'react-redux';
import { Table } from 'semantic-ui-react';
import { getItems } from '../../actions/cartActions';


class ListCart extends React.Component {
  constructor(){
    super();
  }

  componentWillMount() {
      this.props.dispatch(getItems());
  }

  render(){
    return (
      <div>
          
      </div>
    );
  }
}

const mapStateToProps = state => ({
    //items: state.items
});
export default connect(mapStateToProps)(ListCart);
