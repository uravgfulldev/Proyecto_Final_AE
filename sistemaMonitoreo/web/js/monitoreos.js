var xhttp;

function iniciarSesion() {
  let usuario = document.getElementById("txtUser").value;
  let password = document.getElementById("txtPassword").value;

  if (usuario.length !== 0 || password.length !== 0) {
      window.location.replace("mapa.html");
  }
}

function generarReporte() {
    let tabla = document.getElementById("tabla");
    let rows = tabla.rows;
    let reporteJSON = "[";

    for (let i = 1; i < rows.length; i++) {
        reporteJSON = reporteJSON + '{"fecha":"' + rows[i].cells[0].innerHTML + '","zona":"' + rows[i].cells[1].innerHTML + '","materiales":"' + rows[i].cells[2].innerHTML + '","cantidad":"' + rows[i].cells[3].innerHTML + '","conductores":"' + rows[i].cells[4].innerHTML + '"';

        if (rows.length - i === 1) {
            reporteJSON = reporteJSON + "}";
        } else {
            reporteJSON = reporteJSON + "},";
        }
    }

    reporteJSON = reporteJSON + "]";

    let reporte = createJWT(reporteJSON);
    console.log(reporte);

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            alert("Mensaje enviado");
        }
    };

    if (xhttp) {
        xhttp.open("GET", "GenerarReporte?reporte=" + reporte, true);
        xhttp.send();
    }
    
}

function createJWT(mensaje) {
    return btoa(mensaje);
}

function initMap() {
    var mapCenter = { lat: 27.741145211270663, lng: -109.30536124442628 }; // Set the coordinates of the map center
    var mapOptions = { zoom: 12, center: mapCenter }; // Set the initial zoom level and center of the map
    var map = new google.maps.Map(document.getElementById('map'), mapOptions); // Create the map
    window.initMap = initMap;
}
function initMap() {
    var mapCenter = { lat: 27.741145211270663, lng: -109.30536124442628 }; // Set the coordinates of the map center
    var mapOptions = { zoom: 12, center: mapCenter, zoomControl: false, streetViewControl:false,fullscreenControl:false
    ,streetViewControl: false,mapTypeControl: false,mapTypeId: 'satellite'}; // Set the initial zoom level and center of the map
    var directionsService = new google.maps.DirectionsService();
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var locations = [
        '27.739301868948875, -109.30808807563652',
        '27.736073, -109.310073',
        '27.747743, -109.305412'
      ]; // Create the map
      var colors = [
        'RED',
        'blue',
        'green'
      ];
      var waypointsArray = [
        { location: '27.739301868948875, -109.30808807563652' },
        { location: '27.736073, -109.310073' },
        { location: '27.747743, -109.305412' }
      ];
     // for (var i = 0; i < locations.length; i++) {
    var request = {
        origin: '27.74095868652802, -109.3053437359123',
        destination: '27.737101, -109.309195',
        travelMode: 'DRIVING', // or 'WALKING', 'TRANSIT', 'BICYCLING'
        waypoints: waypointsArray,
        optimizeWaypoints: false // Optional: Optimize the order of waypoints for the best route
      };
      
      directionsService.route(request, function(response, status) {
        if (status === 'OK') {
          var directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers:true});
          directionsRenderer.setDirections(response);
          directionsRenderer.setMap(map);
          animateCar(response,map);
        }
        // directionsRenderer.setOptions({
        //     polylineOptions: {
        //       strokeColor: colors[i] // Set different colors for each route
        //     }
        //   });
      });
    //}
    window.initMap = initMap;
  }

  function animateCar(route,map) {
    var step = 0; // Initialize the step counter
    var numSteps = route.routes[0].overview_path.length; // Get the total number of steps in the route
    var icon = {
        url: 'images/car.png', // Replace with the path to your icon image
        scaledSize: new google.maps.Size(35, 35) // Set the desired width and height
      };
    var carMarker = new google.maps.Marker({
      position: route.routes[0].overview_path[0],
      map: map,
      icon: icon // Replace with the path to your car icon image
    });
  
    setInterval(function() {
      step = (step + 1) % numSteps; // Increment the step counter and wrap around
  
      var position = route.routes[0].overview_path[step]; // Get the current position along the route
      carMarker.setPosition(position); // Update the car marker position on the map
    }, 1000); // Adjust the interval (in milliseconds) to control the speed of the animation
  }