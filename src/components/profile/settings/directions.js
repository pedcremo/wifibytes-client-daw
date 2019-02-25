import React from "react";
import { Card, Icon, Button, Modal, Form } from "semantic-ui-react";

class Directions extends React.Component {
  render() {
    console.log(this.props.profile)
    return (
      <Card>
        <Icon name="boxes" size="large" />
        <Card.Content>
          <Card.Header>Direcciones de envío</Card.Header>
          {/*TODO LIST DIRECTIONS */}
          <Modal trigger={<Button>Añadir dirección de envío</Button>}>
            <Modal.Header>Nueva dirección de envío</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Form>
                  <label>Telefono:</label>
                  <input type="text" className="form-control" id="telephone" />
                  <label>Dirección:</label>
                  <input type="text" className="form-control" id="direction" />
                  <label>Codigo postal:</label>
                  <input type="number" className="form-control" id="pcode" />
                  <label>Ciudad:</label>
                  <input type="text" className="form-control" id="city" />
                  <label>Provincia:</label>
                  <input list="provinces" />
                  <datalist id="provinces">
                    {this.props.provinces.map(province => {
                      return <option value={province.provincia} />;
                    })}
                  </datalist>
                  <br /><br />
                  <button type="button" class="btn btn-primary">
                    Confirmar datos
                  </button>
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Card.Content>
      </Card>
    );
  }
}
export default Directions;
