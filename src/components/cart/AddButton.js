import React from 'react';
import {connect} from 'react-redux';
import {setItem} from '../../actions/cartActions'

class AddButton extends React.Component {
  constructor(){
    super();
    this.addItem = () => ev =>{
        ev.preventDefault();
        let item = {
          id : this.props.id /* id item*/,
          description : this.props.description,
          price : this.props.price
        }
        this.props.dispatch(setItem(item));
    }
  }
  render(){
    return (
        <button className="btn btn-secondary" onClick={this.addItem()}>{this.props.text}</button>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(AddButton);