
class Footer {

    constructor(datosEmpresaJSON,selectRule) { 
      let selectedTarget;  
      try{
        selectedTarget=document.querySelector(selectRule);
        if (selectedTarget) selectedTarget.innerHTML=this.render(datosEmpresaJSON);
			  else throw("Error. Selected output target for component "+this.constructor.name+" doesn't exist");
      }catch(e){
        if (selectedTarget) selectedTarget.innerHTML="Problems rendering "+this.constructor.name+" -> "+e;
		  	throw e;
      };        
    }
  
    /** render  */
    render(datosEmpresa) {       
        return `
          <!-- Footer Links -->
          <div class="container-fluid text-center text-md-left " >

          <!-- Grid row -->
          <div class="row">

            <!-- Grid column -->
            <div class="col-md-6 mt-md-0 mt-3" >
              <!-- Content -->
              <h5 class="text-uppercase">What is Wifibytes?</h5>
              It is an internet service provider  It is an internet service provider  It is an internet service provider  It is an internet service provider 
            </div>

            <!-- Grid column -->
            <hr class="clearfix w-100 d-md-none pb-3">

            <!-- Grid column -->
            <div class="col-md-3 mb-md-0 mb-3">
                <!-- Links -->
                <h5 class="text-uppercase">Menu</h5>

                <ul class="list-unstyled">
                  <li>
                    <a href="#!">Catalog</a>
                  </li>
                  <li>
                    <a href="#!">Rates</a>
                  </li>
                  <li>
                    <a href="#!">Our company</a>
                  </li>
                  <li>
                    <a href="#contacte">Contact</a>
                  </li>
                </ul>

              </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-3 mb-md-0 mb-3">

            <!-- Links -->
            <h5 class="text-uppercase">Hints</h5>

            <ul class="list-unstyled">
              <li>
                <a href="#legal">Legal advice</a>
              </li>
              <li>
                <a href="#cookies">Cookies</a>
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
    © 2018 Copyright: ${datosEmpresa.name} | ${datosEmpresa.address}, ${datosEmpresa.city} -${datosEmpresa.zipcode}- (${datosEmpresa.province}) ${datosEmpresa.country}
  
    </div>
    <!-- Copyright --> `
    }
};

export default Footer;
