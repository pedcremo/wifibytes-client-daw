import Component from "./component";

class Catalog extends Component {

    constructor(datosEmpresaJSON,selectRule) {   
        super(datosEmpresaJSON,selectRule);
        this.selectedTarget.innerHTML=this.render(this.inputJSON);   
        var a = document.getElementById("langPicker");
        a.addEventListener("change", this.handleLangPicker.bind(this), false);     
    }
   
    /** render  */
    render(familiesFiltrosArticulos) {
        
        let families = familiesFiltrosArticulos[0];
        let filtres = familiesFiltrosArticulos[1];
        let articles = familiesFiltrosArticulos[2];
        let currentFamily= families.results[0];
        let setFamilies = families.results.map((itemFamily,index) => {
            return `
                <li class="nav-item"> <a id="change-family" class="nav-link ${index==0?"active":""}" data-toggle="pill" href="#catalog/${itemFamily.codfamilia}"><img width="32px" height="32px" src="${itemFamily.icono}" /> ${itemFamily.nombre}</a></li>
            `;
        });
        let setFilters=[];
        for (let [key, value] of Object.entries(filtres)) {
            let values =value.map((item) => {
                let selector;
                if (key=="marca") selector="Marca";
                else selector= "num_"+key;
                return `<option>${item[selector]}</option>`;
            });
            setFilters.push( `<div class="form-group">
                <label for="${key}">${this.T("catalog-"+key)}:</label>
                <select class="form-control" id="${key}">
                    ${values.join("")}
                </select>
               
            </div>`);
        }
        let setArticles = articles.results.map((itemArticle)=> {
            return `
                <div class="card text-center" style="background-color: rgba(255, 255, 255, 0.8)">
                <img class="card-img-top" src="${itemArticle.imagen}" />
                <div class="card-body">                
                <p class="card-text">${itemArticle.descripcion_breve}</p>
                <p class="card-text"><span class="display-4">${itemArticle.pvp}€</span> IVA Incl.</p>
                
                </div>
                <div class="card-footer bg-light"><a href="#" class="btn btn-primary">View details</a> <a href="#" class="btn btn-secondary">Buy</a></div>
                </div>
            `;
        });
         
        return `
       
            <div class="pt-4 pb-4 pr-0 pl-0 m-0 text-white"  style="background-color:${currentFamily.color.hexadecimal}">
                <img class="float-left" src="${currentFamily.imagen_cabecera}" />
               <h3>${currentFamily.pretitulo}</h3>
               <h1 class="display-1">${currentFamily.titulo}</h1><br/><br/>
               <h3>${currentFamily.texto_cabecera}</h3>
               <h1 class="display-3">${currentFamily.precio_cabecera} € IVA Inc.</h1>
               <h3>${currentFamily.subtexto_cabecera}</h3>
            </div>
            <div class="grid">
                <div class="row">
                    <div class="col">
                        <h1 class="text-center">${this.T("catalog-our-articles")}</h1>
                        <h2 class="text-center">${this.T("catalog-change-family")}</h2><br>
                    </div>
                </div>   
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                 ${setFamilies.join("")}
                </ul>
               
                <div class="row">
                   
                        ${setFilters.join("")}
                   
                </div>
            </div>         
            <div class="card-columns m-5">
                ${setArticles.join("")}
            </div>
        `;          
    }
}

export default Catalog; 
