import React from 'react';
import {Utils} from "../utils";
import { Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
/**
 * Draw top menu navbar 
 */

class Navbar extends React.Component{
    /**
     * Constructor
     */
    constructor(props){
        super(props);
        this.state={
            datosEmpresa:[],
            isLoading:true,
            value: Utils.getCookie("language")
        }
        this.handleLangPicker = this.handleLangPicker.bind(this);
    }

    componentDidMount(){
        let that=this;
        Utils.get('/datos_empresa').then((response) => {   
            that.setState({
                datosEmpresa: response,
                isLoading:false
            });
        });
    }
    
    /**
     * Triggered when user changes language selector
     * @param {element} event 
     */
    handleLangPicker(event) {
        this.setState({value: event.target.value});
        Utils.setUserLanguage(event.target.value);       
        var a = document.getElementById("langPicker");
        a.addEventListener("change", this.handleLangPicker.bind(this), false);  
    }
        
    /** render  */
    render() {
        return (
        <HashRouter>
            <div className="navRender">
                <a className="navbar-brand font-weight-bold" href={"#"}><img width="149px" height="49px" src={this.state.datosEmpresa.logo} /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon text-dark"></span>
                </button>
                    <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto ">
                            <li className="nav-item pt-3 text-success">
                                <i className="fas fa-phone"> </i> {this.state.datosEmpresa.phone} &nbsp;
                            </li>
                            <li className="nav-item">
                                <Link to="/catalog" className="nav-link text-dark pt-3">
                                    <span className="text-success">::</span> {Utils.translate("menu-catalog")}
                                </Link>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link text-dark pt-3" href={"#/rates"}><span className="text-success">::</span> {Utils.translate("menu-rates")}</a>
                            </li>
                            <li className="nav-item">
                                <Link to="/company" className="nav-link text-dark pt-3">
                                <span className="text-success">::</span> {Utils.translate("menu-company")}
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                            <a className="nav-link text-dark pt-3" href={"#/company"}><span className="text-success">::</span> {Utils.translate("menu-company")}</a>
                            </li> */}
                            <li className="nav-item">
                            <a className="nav-link text-dark pt-3" href={"#/contacte"}><span className="text-success">::</span> {Utils.translate("menu-contact")}</a>
                            </li>
                            
                            <li className="nav-item">
                            <a className="nav-link disabled pt-3" href={"#"}>{Utils.translate("menu-sign-in")} <i className="fas fa-sign-in-alt"> </i></a>
                            </li>
                            
                            <li className="nav-item">
                            <a className="nav-link text-dark text-align-right" href={Utils.checkURL(this.state.datosEmpresa.twitter)}><i className="fab fa-2x fa-twitter"></i></a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link text-dark" href={Utils.checkURL(this.state.datosEmpresa.facebook)}><i className="fab fa-2x fa-facebook"></i></a>
                            </li>
                            
                            <li className="nav-item pt-3">
                                <select id="langPicker" className="selectpicker" data-width="fit" value={this.state.value} onChange={this.handleLangPicker}>
                                    <option value='english'>English</option>
                                    <option value='spanish' >Español</option>
                                    <option value='valencia' >Valencià</option>
                                </select>
                            </li> 
                            {/* <li class="nav-item dropdown text-dark">
                                <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item text-dark" href="#">Action</a>
                                    <a class="dropdown-item text-dark" href="#">Another action</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item text-dark" href="#">Something else here</a>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#">Disabled</a>
                            </li> */}
                        </ul>
                    {/* <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>   */}
                </div>
            </div>
        </HashRouter>
        );
    }
}

export default Navbar;