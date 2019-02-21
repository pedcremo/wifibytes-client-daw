import React from 'react';
import { Card, Icon, Button, Input } from 'semantic-ui-react';

class PersonalInfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      personalData: false
    }
    this.setInfo = this.setInfo.bind(this);
  }
  setInfo(e){
    e.preventDefault();
    if(this.state.personalData){
      this.setState({
        personalData: false
      });
    }else{
      this.setState({
        personalData: true
      });
    }
    console.log(this.state)
  }
  render(){
    console.log(this.props.profile)
    if(!this.state.personalData){
      return(
        <Card>
          <Icon name="user circle" size="large" />
          <Card.Content>
            <Card.Header>Tus datos</Card.Header>
            <Card.Description>Nombre: <strong>{this.props.profile.nombre}</strong></Card.Description>
            <Card.Description>Apellidos: <strong>{this.props.profile.apellido}</strong></Card.Description>
            <Card.Description>Email: <strong>{this.props.profile.email}</strong></Card.Description>
            <Card.Description>Telefono: <strong>{this.props.profile.telefono}</strong></Card.Description>
            <br /> <br />
            <Button
              onClick={this.setInfo}
            >Modificar Datos</Button>
          </Card.Content>
        </Card>
      )
    }else {
      return (
        <Card>
          <Icon name="user circle" size="large" />
          <Card.Content>
            <Card.Header>Tus datos</Card.Header>
            <Card.Description>Nombre: <Input value={this.props.profile.nombre}></Input></Card.Description>
            <Card.Description>Apellidos: <Input value={this.props.profile.apellido}></Input></Card.Description>
            <Card.Description>Email: <Input value={this.props.profile.email}></Input></Card.Description>
            <Card.Description>Telefono: <Input value={this.props.profile.telefono}></Input></Card.Description>
            <br /> <br />
            <Button
              onClick={this.setInfo}
            >Confirmar Datos</Button>
          </Card.Content>
        </Card>
      )
    }
  }
}
export default PersonalInfo;
