import React from 'react';
import {connect} from 'react-redux';


class AddButton extends React.Component {
  constructor(){
    super();
    this.addItem = () => ev =>{
      ev.preventDefault();
        let form = {
          id : this.props.id /* id item*/,
          description : this.props.description,
          price : this.props.price
        }
        this.props.dispatch(setItem(form));
    }
  }

  render(){
    return (
      <button className="btn btn-secondary" onclick={this.addItem}>{this.props.text}</button>
    );
  }
}

export default AddButton;
