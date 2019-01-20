/** @module ComponentsApp */
import React from 'react';
import { connect } from "react-redux";
import {
    getContactDataForm,
    updateContactDataForm
} from "../../actions/personalDataFormActions";
/**
 * @class
 * Draw Login. A form to login
 */
class PersonalForm extends React.Component  {
    constructor(props) {
        super(props);
        const conten = {
            value:"",
        }
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

    componentDidMount() {
        this.props.dispatch(getContactDataForm());
    }

    componentWillReceiveProps(newProps) {

        
        /*IGUALAR EL ESTADO A LAS PROPS QUE LLEGAN VIA PETICION */
        console.log("1111111", newProps.fields)

    }

    /* This method is listening changes of each form element and the redux state of this form change */
    handleInputChange(event) {
        const target = event.target;
        let value;// = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        

        if (target.type === "number") 
            value = Number(target.value)
        else if (target.type === 'checkbox')
            value = target.checked
        else
            value = target.value
            

        return new Promise((resolve, reject) => 
            resolve(this.setState({
                [name]: {
                    value: value
                }
            }))
        ).then(() => this.props.dispatch(updateContactDataForm(this.state)))
    }

    render() {
        console.log(this.state)
        return (
            <form className="grid-data-form">
                <div>
                    <h4>Personal Data</h4>
                    <div>
                        <input
                        className="grid-data-form__fields"
                        placeholder="Name"
                        name="name"
                        type="text"
                        checked={this.state.name.value}
                        onChange={this.handleInputChange} />
                    </div>

                    <br />
                    <div>
                        <input
                        className="grid-data-form__fields"
                        placeholder="Surname"
                        name = "surname"
                        type="text"
                        value={this.state.surname.value}
                        onChange={this.handleInputChange} />
                    </div>

                    <br />
                    <div>
                        <input
                        className="grid-data-form__fields"
                        placeholder="Email"
                        name = "email"
                        type="email"
                        value={this.state.email.value}
                        onChange={this.handleInputChange} />
                    </div>

                    <br />
                    <div>
                        <input
                        className="grid-data-form__fields"
                        placeholder="Phone"
                        name = "phone"
                        type="number"
                        value={this.state.phone.value}
                        onChange={this.handleInputChange} />
                    </div>
                </div>

                <div>
                    <h4>Address</h4>
                    <div>
                        <input
                        className="grid-data-form__fields"
                        placeholder="Address"
                        name = "address"
                        type = "address"
                        value={this.state.address.value}
                        onChange={this.handleInputChange} />
                    </div>

                    <br />
                    <div>
                        <input
                        className="grid-data-form__fields"
                        placeholder="Zip"
                        name = "zip"
                        type="number"
                        value={this.state.zip.value}
                        onChange={this.handleInputChange} />
                    </div>

                    <br />
                    <div>
                        <input
                        className="grid-data-form__fields"
                        placeholder="City"
                        name = "city"
                        type="text"
                        value={this.state.city.value}
                        onChange={this.handleInputChange} />
                    </div>
                </div >
            </form>
        );
    }


}

const mapStateToProps = state => ({
    fields: state.personalDataForm.fields,
    loaded: state.personalDataForm.loaded,
    error: state.personalDataForm.error
});

export default connect(mapStateToProps)(PersonalForm);