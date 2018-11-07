
 let template= function(tarifaList) {
  const widthColumn = 12/tarifaList.results.length;  
  const highlitedContracts  = tarifaList.results.map((itemFiltered) => {
      const subtarifas = itemFiltered.subtarifas.map((itemSubtarifa) => {
        //1 Movil, 2 Fijo,3 Fibra, 4 wifi, 5 TV      
        switch (itemSubtarifa.tipo_tarifa) {
          case 1: //Movil
            return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-mobile-alt"></i> Mobile ${itemSubtarifa.subtarifa_minutos_gratis} min/month<br/>${itemSubtarifa.subtarifa_datos_internet} GB/month </p>`;
            break;
          case 2: //Fijo
            return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-phone"></i> Land phone free calls </p>`;
            break;
          case 3: //Fibra
            return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-globe"></i> Fiber optics ${itemSubtarifa.subtarifa_velocidad_conexion_subida} MB/Upload <br/> ${itemSubtarifa.subtarifa_velocidad_conexion_bajada} MB/Download </p>`;
            break;
          case 4: //Wifi
            return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-wifi"></i> Wireless ${itemSubtarifa.subtarifa_velocidad_conexion_subida} MB/Upload <br/> ${itemSubtarifa.subtarifa_velocidad_conexion_bajada} MB/Download </p>`;
            break;          
          default:  //TV
            return `<p class="card-text p-2 border-bottom border-secondary"><i class="fas fa-tv"></i> TV ${itemSubtarifa.subtarifa_num_canales} free channels</p>`;
            break;
        }     

      });

      return `      
            
                <div class="card rounded border text-center border-dark text-center " style="background-color: rgba(255, 255, 255, 0.8)">
                <div class="card-header  bg-dark text-light"><img width="32px" height="32px" src="${itemFiltered.logo}"/>  ${itemFiltered.nombretarifa.toUpperCase()}</div>
                <div class="card-body p-0">
                  <h5 class="card-title text-white bg-success p-2 mr-0">${itemFiltered.pretitulo}<br/> ${itemFiltered.precio.toLocaleString()+" €/mes"}</h5>
                  ${subtarifas.join("")}
                  
                </div>
                <div class="card-footer bg-light"><a href="#" class="btn btn-primary">View details</a> <a href="#" class="btn btn-secondary">Contract</a></div>
                </div>
            `   
  });

 return `
 
  <h1 class="text-center text-white pt-5">Your integral communications problem solving company</h1>
   
  <div class="card-deck mt-5 mb-5">
   ${highlitedContracts.join("")}
  </div>
  <div class="text-center text-white pt-4 mb-3 mt-3"  style="background-color: rgba(0,0,0,0.6)">
  <h1 id="banner"></h1>
  </div> 
  `;
 };
  export {template};


  