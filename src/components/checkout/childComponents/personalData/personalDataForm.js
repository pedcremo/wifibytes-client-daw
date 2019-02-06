/** @module ComponentsApp */
import React from 'react';
import {
    updateContactDataForm,
    updateValidDtoPersForm
} from "../../../../actions/personalDataFormActions";
import {validator}  from "./validation";
import Typecliente from './typeCliente';

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
            address:conten,
            zip: conten,
            city: conten,
            tipcli: 0,
            date: conten,
            preview: "",
            dni: conten,
            cif: conten,
            nie: conten
        };
        this.name = React.createRef();
        this.surname = React.createRef();
        this.email = React.createRef();
        this.phone = React.createRef();
        this.address = React.createRef();
        this.zip = React.createRef();
        this.city = React.createRef();
        this.previewFile = this.previewFile.bind(this)
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

    previewFile(){
        var reader  = new FileReader();
        let can = document.getElementById('dni').files[0];

        reader.src = reader.readAsDataURL(can);
        new Promise((resolve, reject) => {
            reader.addEventListener("load", ()=> {
                resolve(reader.result)
            })
        }).then((value)=>{
            this.setState({
                preview: {
                    value: value,
                    error: ""
                }
            })
        }).then(this.props.updateField(updateContactDataForm(this.state)))
      }

    render() {
        let cli=[]
        for (let x in this.props.tipCliente){
            cli.push(x)
        }
        //cli.push(<option value={this.props.tipCliente[x]}>{x}</option>)
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
                        <h4>Fecha de nacimiento: </h4>
                        <input className="form-control form-control-lg"
                        name="date"
                        type="date"
                        value={this.state.date.value}
                        onChange={this.handleInputChange}/>
                        <span className="text-danger">{!this.state.date.error? "":this.state.date.error}</span>
                    </div>
                    <br/>
                    <div>
                        <h4>Suba una imagen de su dni</h4>
                        <input type="file" id="dni" onChange={this.previewFile} /><br/>
                        <img src={this.state.preview.value} height="200" alt="Image preview..."></img>
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
                    <br />
                    <div>
                        <h4>Introduzca el tipo de cliente: </h4>
                        <select name="tipcli" onChange={this.handleInputChange} className={"form-control form-control-lg "+ (!this.state.tipcli.error? "":"border border-danger")}>
                            {
                                cli.map((a, i)=>{
                                    return <option key={i} value={this.props.tipCliente[a]}>{a}</option>
                                })
                            }     
                        </select>
                        <span className="text-danger">{!this.state.tipcli.error? "" :this.state.tipcli.error}</span>
                    </div>
                    <br />
                    <div>
                        {
                        this.state.tipcli.value == 0 ? <Typecliente type={0} dni={this.state.dni.value} change={this.handleInputChange} dnierror={this.state.dni.error}/> : 
                         this.state.tipcli.value == 1 ? <Typecliente type={1} cif={this.state.cif.value} change={this.handleInputChange} ciferror={this.state.cif.error}/> :
                         this.state.tipcli.value == 2 ? <Typecliente type={2} nie={this.state.nie.value} change={this.handleInputChange} nierror={this.state.nie.error}/> :
                         <Typecliente type={5} dni={this.state.dni.value} change={this.handleInputChange} dnierror={this.state.dni.error}/> }
                    </div>
                </div >
            </form>
        );
    }


}
export default PersonalForm;
