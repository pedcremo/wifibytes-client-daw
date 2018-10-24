import {get} from '../utils';
import {Settings} from '../settings';
import {template} from '../templates/home';

class HomeControler {

    constructor() {
        
    }
  
    /** render  */
    static render() {
     
        try{document.getElementById('main').innerHTML =template;}catch(e){console.log("error")};

        let datos_empresa = get(Settings.baseURL+'/datos_empresa').then(function(response) {
            //console.log("Success!", response);
            let datosEmpresa=JSON.parse(response);
            console.log(datosEmpresa);
            document.querySelector('a.navbar-brand').innerHTML ='<img src="'+datosEmpresa.logo+'" />'+ datosEmpresa.name;
            document.querySelector('footer p').innerHTML = datosEmpresa.name;
            //Router.navigate();
          }).catch(function(error) {
            console.log("Failed!", error);
          });
    }
}
export default HomeControler;
