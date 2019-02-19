import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';

class PersonalInfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      personalData: false
    }
  }
  setInfo(){
    if(this.state.personalData){
      this.setState({
        personalData: false
      });
    }else{
      this.setState({
        personalData: true
      });
    }
  }
  render(){
    if(!this.state.personalData){
      return(
        <Card>
          <Icon name="user circle" size="large" />
          <Card.Content>
            <Card.Header>Tus datos</Card.Header>
            <Card.Description>Nombre: <strong>[User information]</strong></Card.Description>
            <Card.Description>Apellidos: <strong>[User surname]</strong></Card.Description>
            <Card.Description>Email: <strong>[User email]</strong></Card.Description>
            <Card.Description>Telefono: <strong>[User telephone]</strong></Card.Description>
            <Button
              onClick={e => (e.preventDefault(), this.setInfo)}
            >Modificar Datos</Button>
          </Card.Content>
        </Card>
      )
    }else {
      return (
        null
      )
    }
  }
}
export default PersonalInfo;
