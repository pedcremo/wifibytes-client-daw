 let template = function(datosEmpresa) {

  const carouselItems= datosEmpresa.textos.filter((itemText) => {
    return itemText.key.match(/jumbotron/i);
  }).map((item,index) => {
      return `
      <div class="carousel-item ${index==0?'active':''}">
          <img class="img-fluid" width="100%" src="${item.image}" alt="">
          <div class="carousel-caption d-none d-md-block">
          <h5>...</h5>
          ${item.content}
          </div>
        </div>
       `
  });

 return `

 <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
 <ol class="carousel-indicators">
   <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
   <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
   <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
 </ol>
 <div class="carousel-inner">
   ${carouselItems.join("")}
 </div>
 <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
   <span class="sr-only">Previous</span>
 </a>
 <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
   <span class="carousel-control-next-icon" aria-hidden="true"></span>
   <span class="sr-only">Next</span>
 </a>
</div>
  
  
  `
};

export {template};