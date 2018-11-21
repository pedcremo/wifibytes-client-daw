import Component from "./component";

class Footer extends Component{

    constructor(datosEmpresaJSON,selectRule) { 
        super(datosEmpresaJSON,selectRule);
        this.selectedTarget.innerHTML=this.render(this.inputJSON);     
    }
  
    /** render: Array with two JSONs first element datosEmpresa endpoint and second home endpoint  */
    render(datosEmpresaHome) {       
        
        const datosEmpresa = datosEmpresaHome[0];
        const home = datosEmpresaHome[1][0];
        return `
          <!-- Footer Links -->
          <div class="container-fluid text-center text-md-left " >

          <!-- Grid row -->
          <div class="row">

            <!-- Grid column -->
            <div class="col-md-6 mt-md-0 mt-3" >
              <!-- Content -->
              <h5 class="text-uppercase">${home.caja_izquierda_titulo}</h5>
              ${home.caja_izquierda_texto}
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
                <a href="http://${datosEmpresa.twitter}"><i class="fab  fa-twitter"></i></a>
              </li>
              <li>
                <a href="http://${datosEmpresa.facebook}"><i class="fab fa-facebook"></i></a>
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
    © 2018 Copyright: ${datosEmpresa.name} | <i class="fas fa-phone"></i> ${datosEmpresa.phone} |${datosEmpresa.address}, ${datosEmpresa.city} -${datosEmpresa.zipcode}- (${datosEmpresa.province}) ${datosEmpresa.country}
  
    </div>
    <!-- Copyright --> `;
    }
}

export default Footer;
