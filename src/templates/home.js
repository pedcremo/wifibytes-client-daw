
 let template= function(tarifaList) {
  const widthColumn = 12/tarifaList.results.length;  
  const highlitedContracts  = tarifaList.results.map((itemFiltered) => {
      return `<div class="col-md-${widthColumn}">      
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${itemFiltered.nombretarifa}</h5>
                  <p class="card-text">${itemFiltered.precio}</p>
                  <a href="#" class="btn btn-primary">View details</a>
                </div>
              </div>
            </div>`   
  });

 return `
  <div class="row mt-5">
   ${highlitedContracts.join("")}
  </div>
  `;
 };
  export {template};


  