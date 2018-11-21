import {setUserLanguage,getCookie} from "../utils";
import Component from "./component";
import {Router} from '../router.js';

class Navbar extends Component{

    constructor(datosEmpresaJSON,selectRule) {
        super(datosEmpresaJSON,selectRule);
        this.selectedTarget.innerHTML=this.render(this.inputJSON);
        this.handleLangPicker =this.handleLangPicker.bind(this); 
        var a = document.getElementById("langPicker");
            a.addEventListener("change", this.handleLangPicker.bind(this), false);
    }

    handleLangPicker(event) {
        setUserLanguage(event.target.value);             
    }
        
    /** render  */
    render(datosEmpresa) {   
        return `
            <a class="navbar-brand font-weight-bold" href="#"><img width="149px" height="49px" src="${datosEmpresa.logo}" /></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon text-dark"></span>
            </button>

            <div class="collapse navbar-collapse text-center" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto ">
               
                <li class="nav-item pt-3 text-success">
                    <i class="fas fa-phone"> </i> ${datosEmpresa.phone} &nbsp;
                </li>
                <li class="nav-item active">
                <a class="nav-link text-dark pt-3" href="#/catalog"><span class="text-success">::</span> ${this.T("menu-catalog")}</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark pt-3" href="#/rates"><span class="text-success">::</span> ${this.T("menu-rates")}</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark pt-3" href="#/company"><span class="text-success">::</span> ${this.T("menu-company")}</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark pt-3" href="#/contacte"><span class="text-success">::</span> ${this.T("menu-contact")}</a>
                </li>
                
                <li class="nav-item">
                <a class="nav-link disabled pt-3" href="#">${this.T("menu-sign-in")} <i class="fas fa-sign-in-alt"> </i></a>
                </li>
                
                <li class="nav-item">
                <a class="nav-link text-dark text-align-right" href="http://${datosEmpresa.twitter}"><i class="fab fa-2x fa-twitter"></i></a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark" href="http://${datosEmpresa.facebook}"><i class="fab fa-2x fa-facebook"></i></a>
                </li>
                
                <li class="nav-item pt-3">
                    <select id="langPicker" class="selectpicker" data-width="fit" >
                        <option value='english' ${getCookie("language")=="english"?"selected":""}>English</option>
                        <option value='spanish' ${getCookie("language")=="spanish"?"selected":""}>Español</option>
                        <option value='valencia' ${getCookie("language")=="valencia"?"selected":""}>Valencià</option>
                    </select>
                </li>
                <!-- <li class="nav-item dropdown text-dark">
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
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>  -->
            </div>
            `;
    }
}

export default Navbar;