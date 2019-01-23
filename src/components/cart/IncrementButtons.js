import React from 'react';
import {connect} from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

class IncrementButtons extends React.Component{
  constructor(){
    super();
  }
  render(){
    return(
      <Button.Group icon>
        <Button size="mini" onClick={() => this.props.onClick(this.props.item, 1)}>
          <Icon name='add' />
        </Button>
        <Button size='mini' onClick={() => this.props.onClick(this.props.item, -1)}>
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
