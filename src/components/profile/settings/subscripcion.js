import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';

class Subscripcion extends React.Component {
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
                    <Icon name="newspaper" size="large" />
                    <Card.Content>
                        <Card.Header>Estado hoja informativa</Card.Header>
                        {this.props.profile.newsletter? <p>Estas subscrito a las noticias</p>: <button>Subscribirse</button>}
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
export default Subscripcion;