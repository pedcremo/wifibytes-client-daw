import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';

class Directions extends React.Component {
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
                    <Icon name="boxes" size="large" />
                    <Card.Content>
                        <Card.Header>Direcciones de envío</Card.Header>
                            {/*TODO LIST DIRECTIONS */}
                        <Button
                            onClick={e => (e.preventDefault(), this.setInfo)}
                        >Añadir dirección de envio</Button>
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
export default Directions;