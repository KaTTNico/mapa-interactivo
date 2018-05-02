lugaresModulo = (function () {
  var servicioLugares // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

    // Completa las direcciones ingresadas por el usuario a y establece los límites
    // con un círculo cuyo radio es de 20000 metros.
  function autocompletar () {
        /* Completar la función autocompletar(): autocompleta los 4 campos de texto de la
        página (las direcciones ingresables por el usuario).
        Para esto creá un círculo con radio de 20000 metros y usalo para fijar
        los límites de la búsqueda de dirección. El círculo no se debe ver en el mapa. */
        let geolocation;
        (navigator.geolocation) ? navigator.geolocation.getCurrentPosition((position)=>
                geolocation = {lat: position.coords.latitude,lng: position.coords.longitude}
              ):geolocation;

        let circulo = new google.maps.Circle({
          //si no se permitio la geolocation al sitio entonces tomar la posicionCentral
          center: geolocation? geolocation : posicionCentral,
          radius: 20000
        });

        let options = {
          bounds: circulo.getBounds(),
          types: ['establishment']
        };

        autocomplete = new google.maps.places.Autocomplete(document.getElementById('direccion'), options);
  }

    // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar () {
    servicioLugares = new google.maps.places.PlacesService(mapa)
    autocompletar()
  }

    // Busca lugares con el tipo especificado en el campo de TipoDeLugar

  function buscarCerca (posicion) {
        /* Completar la función buscarCerca  que realice la búsqueda de los lugares
    del tipo (tipodeLugar) y con el radio indicados en el HTML cerca del lugar
    pasado como parámetro y llame a la función marcarLugares. */
    let request={
      location:posicion,
      radius:document.getElementById('radio').value,
      query:document.getElementById('tipoDeLugar').value
    }
    //al callback del nearbySearch lo deje como arrow function porque solo llamaba a marcarLugares y no me parecio mejor dejarlo asi
    servicioLugares.nearbySearch(request,(results,status)=>marcadorModulo.marcarLugares(results,status));
  }
  return {
    inicializar,
    buscarCerca
  }
})()
