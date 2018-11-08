class NavbarControler {

    constructor(datosEmpresaJSON,selectRule) { 
        try{
            document.querySelector(selectRule).innerHTML=this.render(datosEmpresaJSON);     
        }catch(e){
            console.log(e+" error")
        };        
    }
  
    /** render  */
    render(datosEmpresa) {   
        return `
            <a class="navbar-brand font-weight-bold" href="#"><img width="149px" height="49px" src="${datosEmpresa.logo}" /></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon text-dark"></span>
            </button>

            <div class="collapse navbar-collapse text-center" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto ">
            
                <li class="nav-item">
                <a class="nav-link text-dark pt-3" href="#/catalog"><span class="text-success">::</span> Catalog</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark pt-3" href="#/rates"><span class="text-success">::</span> Rates</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark pt-3" href="#/company"><span class="text-success">::</span> Our company</a>
                </li>
                <li class="nav-item">
                <a class="nav-link text-dark pt-3" href="#/contacte"><span class="text-success">::</span> Contact</a>
                </li>
                
                <li class="nav-item">
                <a class="nav-link disabled pt-3" href="#">Sign in <i class="fas fa-sign-in-alt"> </i></a>
                </li>
                <li class="nav-item active">
                <a class="nav-link text-dark text-align-right" href="http://${datosEmpresa.twitter}"><i class="fab fa-2x fa-twitter"></i></a>
                </li>
                <li class="nav-item active">
                <a class="nav-link text-dark" href="http://${datosEmpresa.facebook}"><i class="fab fa-2x fa-facebook"></i></a>
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
            `
    }
};

export default NavbarControler;