/** @module ComponentsApp */
import React from 'react';
import {
    updateContactDataForm,
    updateValidDtoPersForm
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
        this.name = React.createRef();
        this.surname = React.createRef();
        this.email = React.createRef();
        this.phone = React.createRef();
        this.address = React.createRef();
        this.zip = React.createRef();
        this.city = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /**
     * This method is listening changes of some prop (comming from its father)
     * @param {newProps} newProps  
     */
    componentWillReceiveProps(newProps) {
        
        if (Object.keys(newProps.dataUser).length > 0) {
            let cont=0;
            for (const key in this.state) {
                new Promise((resolve, reject) =>{
                    const error = validator(newProps.dataUser[key].value, this.refs[key]["name"], this.refs[key]["type"])
                    if (error!=undefined) 
                        cont++          
                                      
                    resolve(
                        this.setState({
                            [key]: {
                                value: newProps.dataUser[key].value,
                                error: error
                            }
                        }))
                })
                .then(()=>{
                    if (cont==0) 
                        this.props.updateField(updateValidDtoPersForm())
                    else
                        console.log("no valid")
                })
            }//end for
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
                    <h2>Personal Data</h2>
                    <div>
                        <input
                        className="form-control form-control-lg mio"
                        placeholder="Name"
                        name="name"
                        ref="name"
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
                        ref = "surname"
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
                        ref = "email"
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
                        ref = "phone"
                        type="number"
                        value={this.state.phone.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.phone.error? "":this.state.phone.error}</span>
                    </div>
                </div>

                <div>
                    <h2>Address</h2>
                    <div>
                        <input
                        className="form-control form-control-lg"
                        placeholder="Address"
                        name = "address"
                        ref = "address"
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
                        ref = "zip"
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
                        ref = "city"
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
