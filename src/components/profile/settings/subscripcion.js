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
                        {/*TODO LIST DIRECTIONS */}
                        <Button
                            onClick={e => (e.preventDefault(), this.setInfo)}
                        >Subscribe</Button>
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