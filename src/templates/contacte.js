let template= function(datosEmpresa) {
return `
<div class="row mt-25">
		<div class="col-md-6 form-group">
            	<h1>Contacte ${datosEmpresa.name}</h1>
			<form name="contacto">
				<div class="form-group">
					<input type="text" aria-label="Nombre" name="nombre" placeholder="Nom i Cognoms" required="" class="form-control">
				</div>	
				<div class="form-group">
					<input type="text" aria-label="Telefono" name="telefono" placeholder="Telèfon" class="form-control">
				</div>
				<div class="form-group">
					<input type="email" aria-label="Email" name="email" placeholder="Email" required="" class="form-control">
				</div>
				<div class="form-group">
					<textarea name="mensaje" aria-label="Mensaje" required="" rows="9" class="form-control">Escriu comentari</textarea>
				</div>
				<button type="button" class="btn btn-primary">Enviar Missatge</button>
			</form>
		</div>
		<div class="col-md-6">
	   	<!--<div id="map_div" style="height:400px; width: 100%;"></div>-->

			<div class="mapouter">
				<div class="gmap_canvas">
					<iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Wifibytes%2C%20Bocairente%2C%20Espa%C3%B1a&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
					</iframe>
				</div>
				<style>.mapouter{overflow:hidden;height:500px;width:100%;}.gmap_canvas {background:none!important;height:500px;width:100%;}</style>
			</div>

			<p> ${datosEmpresa.address}, ${datosEmpresa.city}, -${datosEmpresa.zipcode}- (${datosEmpresa.province}) ${datosEmpresa.country} </p>

		</div>
	
	</div>
`;
}

export {template};