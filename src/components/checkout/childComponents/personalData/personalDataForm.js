/** @module ComponentsApp */
import React from 'react';
import {
    updateContactDataForm
} from "../../../../actions/personalDataFormActions";
import {validator}  from "./validation";

/**
 * @class
 * This component contain the Personal Data Form
 */
class PersonalForm extends React.Component  {
    constructor(props) {
        super(props);
        const conten = {value:"",}
        this.state = {
            name:conten,
            surname: conten,
            email:conten,
            phone: conten,
            address:conten,
            zip: conten,
            city: conten
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /**
     * This method is listening changes of some prop (comming from its father)
     * @param {newProps} newProps  
     */
    componentWillReceiveProps(newProps) {
/**WARNING TO EMPROVE
 * ----------------------------------------------------------------------------------------------
 * Cuando la informacion viene del backend o de local deberia volver a pasar el validador y comprobar si los datos ya estan correctos de acuerdo a las reglas marcadas
 * * ----------------------------------------------------------------------------------------------
 */
        if (Object.keys(newProps.dataUser).length > 0) 
            for (const key in this.state) {
                this.setState({
                    [key]: {
                        value: newProps.dataUser[key].value,
                        error: newProps.dataUser[key].error
                    }
                })
            }
    }



    /** 
     * This method is listening changes of each form element 
     * The redux state of this form also change 
     */
    handleInputChange(event) {
        const target = event.target;
        // = target.type === 'checkbox' ? target.checked : target.value;
        let value;
        const name = target.name;
        
        /** 
         * Check what kind of type is each element and transform them
         */
        if (target.type === "number") 
            value = Number(target.value)
        else if (target.type === 'checkbox')
            value = target.checked
        else
            value = target.value
        
        /** 
         * Return a error if a field is incorrect 
         */
        const error = validator(value, name, target.type)

        /** 
         * The component change its own state and send a dispatch to redux
         * this.props.updateField "updateField" is a function which come from its father
         */
        return new Promise((resolve, reject) => 
            resolve(this.setState({
                [name]: {
                    value: value,
                    error: error
                }
            }))
        )
        .then(() => this.props.updateField(updateContactDataForm(this.state)))
    }




    render() {
        return (
            <form className="grid-data-form">
               <div>
                    <h4>Personal Data</h4>
                    <div>
                        <input
                        className="form-control form-control-lg mio"
                        placeholder="Name"
                        name="name"
                        id = "name"
                        type="text"
                        value={this.state.name.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.name.error? "":this.state.name.error}</span>
                    </div>

                    <br />
                    <div>
                        <input
                        className="form-control form-control-lg"
                        placeholder="Surname"
                        name = "surname"
                        type="text"
                        value={this.state.surname.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.surname.error? "":this.state.surname.error}</span>
                    </div>

                    <br />
                    <div>
                        <input
                        className="form-control form-control-lg"
                        placeholder="Email"
                        name = "email"
                        type="email"
                        value={this.state.email.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.email.error? "":this.state.email.error}</span>
                    </div>

                    <br />
                    <div>
                        <input
                        className="form-control form-control-lg"
                        placeholder="Phone"
                        name = "phone"
                        type="number"
                        value={this.state.phone.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.phone.error? "":this.state.phone.error}</span>
                    </div>
                </div>

                <div>
                    <h4>Address</h4>
                    <div>
                        <input
                        className="form-control form-control-lg"
                        placeholder="Address"
                        name = "address"
                        type = "text"
                        value={this.state.address.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.address.error? "":this.state.address.error}</span>
                    </div>

                    <br />
                    <div>
                        <input
                        className="form-control form-control-lg"
                        placeholder="Zip"
                        name = "zip"
                        type="number"
                        value={this.state.zip.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.zip.error? "":this.state.zip.error}</span>
                    </div>

                    <br />
                    <div>
                        <input                        
                        className={"form-control form-control-lg "+ (!this.state.city.error? "":"border border-danger")}
                        placeholder="City"
                        name = "city"
                        type="text"
                        value={this.state.city.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.city.error? "":this.state.city.error}</span>
                    </div>
                </div >
            </form>
        );
    }


}
export default PersonalForm;
