/** @module ComponentsApp */
import React from 'react';
import {
    updateContactDataForm,
    updateValidDtoPersForm
} from "../../../../actions/personalDataFormActions";
import {validator}  from "./validation";
import Typecliente from './typeCliente';
import Swal from 'sweetalert2';
import {PropTypes, number} from 'prop-types';

/**
 * @class
 * This component contain the Personal Data Form
 */
class PersonalForm extends React.Component  {
    
    constructor(props) {
        super(props);
        /* alert("PersonalForm") */
        const conten = {value:"",}
        this.state = {
            name:conten,
            surname: conten,
            email:conten,
            address:conten,
            zip: conten,
            city: conten,
            tipcli: {value: "0"},
            date: conten,
            preview: conten,
            identificador: conten,
            cuenta:conten
        };
        this.name = React.createRef();
        this.surname = React.createRef();
        this.email = React.createRef();
        this.phone = React.createRef();
        this.address = React.createRef();
        this.zip = React.createRef();
        this.city = React.createRef();
        this.previewFile = this.previewFile.bind(this);
        this.cuenta = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.comprobacion = this.comprobacion.bind(this);
    }

    /**
     * This method is listening changes of some prop (comming from its father)
     * @param {newProps} newProps  
     */
    componentWillReceiveProps(newProps) {
        console.log("00000000000000000",newProps)
        if (Object.keys(newProps.dataUser).length > 0) {
            let cont=0;
            for (const key in this.state) {
                new Promise((resolve, reject) =>{
                    let error=""
                    
                    if (typeof (newProps.dataUser[key]["value"])==="object") 
                        error = validator(newProps.dataUser[key]["value"], this.refs[key]["name"], this.refs[key]["type"])
                        
                    
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
                        console.log("no valido")
                })
            }//end for
        }

    }

    changeState(name, value, error=""){
            this.setState({
                [name]: {
                    value: value,
                    error: error
                }
            },()=>{ this.props.updateField(updateContactDataForm(this.state))
                this.comprobacion()
            })
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
            console.log(value)
        /** 
         * Return a error if a field is incorrect 
         */
        const error = validator(value, name, target.type, this.state.tipcli.value)
        
        
        /** 
         * The component change its own state and send a dispatch to redux
         * this.props.updateField "updateField" is a function which come from its father
         */
        this.changeState(name,value, error)
    }

    /**
     * Comprueba que todo el personalData sea valido, tiene en cuenta si escribes varias
     * veces para reiniciar la comprobacion guardando los ms del dia de hoy y cada vez que
     * comprueba un campo antes de ello chequea si los ms principales (antes de comprobar todo)
     * es menor al actual (para saber si el usuario ha introducido algo mas) si es asi la comprobacion
     * se reinicia si no sigue
     */
    comprobacion(){
            let a = false;
            try{
                Object.values(this.state).forEach((element, i) => {
                    if (((element.value.length > 1 || element.value.toString().length >= 1) && element.value !== "") &&
                        (element.error === "" || element.error === undefined || !element.error)){
                        a = true;
                    }else{
                        a = false;
                        BreakException;
                    }
                });
                if (a){
                    new Promise((resolve, reject) =>{
                        resolve(this.props.valid("personalDataViewIsValid",true))
                    }).then(()=>console.log(this.props.value))
                }
            }catch(e){
                a = false;
                console.log("No valido")
            }
    }

    /**
     * Se sube la imagen, se comprueba que el tamaño no sea superior a 2Mb y se transforma la imagen
     * a base64 y se guarda en el estado de preview
     */
    previewFile(){
        var reader  = new FileReader();
        let can = document.getElementById('imgdni').files[0];

        if (can){
            if ( can.size < 2000000 ){
                reader.src = reader.readAsDataURL(can);
                new Promise((resolve, reject) => {
                    reader.addEventListener("load", ()=> {
                        resolve(reader.result)
                    })
                }).then((value)=>{
                    const error = validator(value, "imgdni", "file")
                    this.changeState("preview",value, error)
                })
            }else{
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: this.context.t('personalData-notifyError-bigImage'),
                })
                /* Remove image from input type file because is too big */
                document.getElementById('imgdni').value = "";
            }
        }
      }

    render() {
        let cli=[]
        for (let x in this.props.tipCliente){
            cli.push(x)
        }
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
                        <h4>Suba una fotocopia de ambas caras del dni:</h4>
                        <label>
                            <input type="file" id="imgdni" name="preview" onChange={this.previewFile} /><br/><br/>
                            <img src={this.state.preview.value} height="200" width="200" alt="Image preview..."/>
                        </label>
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

                    <div>
                        <input                      
                        className={"form-control form-control-lg "+ (!this.state.cuenta.error? "":"border border-danger")}
                        placeholder="Cuenta bancaria"
                        name = "cuenta"
                        ref = "cuenta"
                        type="text"
                        value={this.state.cuenta.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.cuenta.error? "":this.state.cuenta.error}</span>
                    </div>
                    <br />
                    <div>
                        <h4>Introduzca el tipo de cliente: </h4>
                        <select name="tipcli" onChange={this.handleInputChange} className={"form-control form-control-lg "+ (!this.state.tipcli.error? "":"border border-danger")}>
                            {cli.map((a, i)=>{
                                    return <option key={i} value={this.props.tipCliente[a]}>{a}</option>
                            })}     
                        </select>
                        <span className="text-danger">{!this.state.tipcli.error? "" :this.state.tipcli.error}</span>
                    </div>
                    <br />
                    <div>
                        {
                        this.state.tipcli.value == 0 ? <Typecliente type={0} dni={this.state.identificador.value} change={this.handleInputChange} dnierror={this.state.identificador.error}/> : 
                         this.state.tipcli.value == 1 ? <Typecliente type={1} cif={this.state.identificador.value} change={this.handleInputChange} ciferror={this.state.identificador.error}/> :
                         this.state.tipcli.value == 2 ? <Typecliente type={2} nie={this.state.identificador.value} change={this.handleInputChange} nierror={this.state.identificador.error}/> :
                         <Typecliente type={5} dni={this.state.identificador.value} change={this.handleInputChange} dnierror={this.state.identificador.error}/> }
                    </div>
                </div >
            </form>
        );
    }


}

PersonalForm.contextTypes = {
    t: PropTypes.func.isRequired
}

export default PersonalForm;
