
 let template= function(tarifaList) {
  const widthColumn = 12/tarifaList.results.length;  
  const highlitedContracts  = tarifaList.results.map((itemFiltered) => {
      const subtarifas = itemFiltered.subtarifas.filter((itemSubtarifa) => {
        return itemSubtarifa.activo;
      }).map((itemSubtarifa) => {
        //1 Movil, 2 Fijo,3 Fibra, 4 wifi, 5 TV
        debugger;
        switch (itemSubtarifa.tipotarifa) {
          case '1': //Movil
            return `<p class="card-text mb-0 bg-white"><i class="fas fa-mobile-alt"></i></p>`;
            break;
          case '2': //Fijo
            return `<p class="card-text mb-0 bg-white"><i class="fas fa-phone"></i></p>`;
            break;
          case '3': //Fibra
            return `<p class="card-text mb-0 bg-white"><i class="fas fa-globe"></i></p>`;
            break;
          case '4': //Wifi
            return `<p class="card-text mb-0 bg-white"><i class="fas fa-wifi"></i></p>`;
            break;          
          default:  //TV
            return `<p class="card-text mb-0 bg-white"><i class="fas fa-tv"></i></p>`;
        }     

      });

      return `<div class="col-md-${widthColumn}">      
              <div class="card text-center ">
              <div class="card-header  bg-light text-dark"><img width="32px" height="32px" src="${itemFiltered.logo}"/>  ${itemFiltered.nombretarifa.toUpperCase()}</div>
                <div class="card-body bg-success">
                  <h5 class="card-title text-white">${itemFiltered.pretitulo}<br/> ${itemFiltered.precio.toLocaleString()+" €/mes"}</h5>
                  ${subtarifas.join("")}
                  <a href="#" class="btn btn-primary">View details</a>
                </div>
              </div>
            </div>`   
  });

 return `
  <div class="row m-3">
   ${highlitedContracts.join("")}
  </div>
  `;
 };
  export {template};


  