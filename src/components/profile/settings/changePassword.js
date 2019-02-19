import React from 'react';
import { Card, Icon, Button, Input } from 'semantic-ui-react';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personalData: false
        }
    }
    setInfo() {
        if (this.state.personalData) {
            this.setState({
                personalData: false
            });
        } else {
            this.setState({
                personalData: true
            });
        }
    }
    render() {
        if (!this.state.personalData) {
            return (
                <Card>
                    <Icon name="file" size="large" />
                    <Card.Content>
                        <Card.Header>Cambiar contraseña</Card.Header>
                            <label>Nueva contraseña:</label>
                            <Input type="password"/>
                            <label>Repita contraseña:</label>
                            <Input type="password"/>
                        <Button
                            onClick={e => (e.preventDefault(), this.setInfo)}
                        >Añadir dirección de facturación</Button>
                    </Card.Content>
                </Card>
            )
        } else {
            return (
                null
            )
        }
    }
}
export default ChangePassword;