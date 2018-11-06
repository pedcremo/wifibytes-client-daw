
 let template= function(tarifaList) {
  const widthColumn = 12/tarifaList.results.length;  
  const highlitedContracts  = tarifaList.results.map((itemFiltered) => {
      const subtarifas = itemFiltered.subtarifas.map((itemSubtarifa) => {
        //1 Movil, 2 Fijo,3 Fibra, 4 wifi, 5 TV      
        switch (itemSubtarifa.tipo_tarifa) {
          case 1: //Movil
            return `<p class="card-text p-2 "><i class="fas fa-mobile-alt"></i> Mobile ${itemSubtarifa.subtarifa_minutos_gratis} min/month<br/>${itemSubtarifa.subtarifa_datos_internet} GB/month </p>`;
            break;
          case 2: //Fijo
            return `<p class="card-text p-2 "><i class="fas fa-phone"></i> Land phone free calls </p>`;
            break;
          case 3: //Fibra
            return `<p class="card-text p-2 "><i class="fas fa-globe"></i> Fiber optics ${itemSubtarifa.subtarifa_velocidad_conexion_subida} MB/Upload <br/> ${itemSubtarifa.subtarifa_velocidad_conexion_bajada} MB/Download </p>`;
            break;
          case 4: //Wifi
            return `<p class="card-text p-2 "><i class="fas fa-wifi"></i> Wireless ${itemSubtarifa.subtarifa_velocidad_conexion_subida} MB/Upload <br/> ${itemSubtarifa.subtarifa_velocidad_conexion_bajada} MB/Download </p>`;
            break;          
          default:  //TV
            return `<p class="card-text p-2 "><i class="fas fa-tv"></i> TV ${itemSubtarifa.subtarifa_num_canales} free channels</p>`;
            break;
        }     

      });

      return `      
            
                <div class="card border style="opacity:0.4" border-dark text-center ">
                <div class="card-header  bg-dark text-light"><img width="32px" height="32px" src="${itemFiltered.logo}"/>  ${itemFiltered.nombretarifa.toUpperCase()}</div>
                <div class="card-body >
                  <h5 class="card-title p-2 bg-success text-white">${itemFiltered.pretitulo}<br/> ${itemFiltered.precio.toLocaleString()+" €/mes"}</h5>
                  ${subtarifas.join("")}
                  
                </div>
                <div class="card-footer bg-light"><a href="#" class="btn btn-primary">View details</a> <a href="#" class="btn btn-secondary">Contract</a></div>
                </div>
            `   
  });

 return `
  <div class="card-deck m-5">
   ${highlitedContracts.join("")}
  </div>
  `;
 };
  export {template};


  