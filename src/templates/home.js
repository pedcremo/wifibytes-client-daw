
 let template= function(tarifaList) {
  const widthColumn = 12/tarifaList.results.length;  
  const highlitedContracts  = tarifaList.results.map((itemFiltered) => {
      return `<div class="col-md-${widthColumn}"><h2>${itemFiltered.nombretarifa}</h2><p>${itemFiltered.precio}</p>
        <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p></div>`   
  });

 return `
  <div class="row mt-5">
   ${highlitedContracts.join("")}
</div>

  `;
 };
  export {template};


  