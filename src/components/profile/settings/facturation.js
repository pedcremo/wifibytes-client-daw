import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';

class Facturation extends React.Component {
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
                    <Icon name="file alternate outline" size="large" />
                    <Card.Content>
                        <Card.Header>Datos de facturación</Card.Header>
                        {/*TODO LIST FACTURATION */}
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
export default Facturation;