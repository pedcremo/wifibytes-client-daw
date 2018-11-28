import Component from "./component";
/**
 * Draw footer web app
 */
class Footer extends Component{
    /**
     * @constructor
     * @param {json} datosEmpresaJSON 
     * @param {string} selectRule 
     */
    constructor(datosEmpresaJSON,selectRule) { 
        super(datosEmpresaJSON,selectRule);
        this.state={
            datosEmpresa:this.inputJSON[0],
            home:this.inputJSON[1][0] //Prefiltered by get 
        };
        this.selectedTarget.innerHTML=this.render(this.inputJSON);     
    }
  
    /** render */
    render() {       
        
        return `
          <!-- Footer Links -->
          <div class="container-fluid text-center text-md-left " >

          <!-- Grid row -->
          <div class="row">

            <!-- Grid column -->
            <div class="col-md-6 mt-md-0 mt-3" >
              <!-- Content -->
              <h5 class="text-uppercase">${this.state.home.caja_izquierda_titulo}</h5>
              ${this.state.home.caja_izquierda_texto}
              </div>

            <!-- Grid column -->
            <hr class="clearfix w-100 d-md-none pb-3">

            <!-- Grid column -->
            <div class="col-md-3 mb-md-0 mb-3">
                <!-- Links -->
                <h5 class="text-uppercase">${this.T("footer-menu")}</h5>

                <ul class="list-unstyled">
                  <li>
                    <a href="#catalog">${this.T("footer-catalog")}</a>
                  </li>
                  <li>
                    <a href="#rates">${this.T("footer-rates")}</a>
                  </li>
                  <li>
                    <a href="#company">${this.T("footer-company")}</a>
                  </li>
                  <li>
                    <a href="#contacte">${this.T("footer-contact")}</a>
                  </li>
                </ul>

              </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-3 mb-md-0 mb-3">

            <!-- Links -->
            <h5 class="text-uppercase">${this.T("footer-hints")}</h5>

            <ul class="list-unstyled">
              <li>
                <a href="#legal">${this.T("footer-legal-advice")}</a>
              </li>
              <li>
                <a href="#cookies">${this.T("footer-cookies")}</a>
              </li>
              <li>
                <a href="${this.checkURL(this.state.datosEmpresa.twitter)}"><i class="fab  fa-twitter"></i></a>
              </li>
              <li>
                <a href="${this.checkURL(this.state.datosEmpresa.facebook)}"><i class="fab fa-facebook"></i></a>
              </li>
            </ul>

          </div>
          <!-- Grid column -->

      </div>
      <!-- Grid row -->

    </div>
    <!-- Footer Links -->

    <!-- Copyright -->
    <div class="footer-copyright text-center bg-dark py-3 text-white">
    © 2018 Copyright: ${this.state.datosEmpresa.name} | <i class="fas fa-phone"></i> ${this.state.datosEmpresa.phone} |${this.state.datosEmpresa.address}, ${this.state.datosEmpresa.city} -${this.state.datosEmpresa.zipcode}- (${this.state.datosEmpresa.province}) ${this.state.datosEmpresa.country}
  
    </div>
    <!-- Copyright --> `;
    }
}

export default Footer;
