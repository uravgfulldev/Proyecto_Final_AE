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
    var mapCenter = { lat:  31.390347, lng: -110.605142}; // Set the coordinates of the map center
    var mapOptions = { zoom: 10, center: mapCenter ,zoomControl: false, fullscreenControl: false,mapTypeControl:false,
    streetViewControl:false}; // Set the initial zoom level and center of the map
    var map = new google.maps.Map(document.getElementById('map'), mapOptions); // Create the map
  
    //Red road
    var waypointsArray = [
        { location: '31.403964, -110.590369' },
        { location: '31.394831, -110.591702' },
        { location: '31.390933, -110.603802' }
    ];
    var directionsService = new google.maps.DirectionsService();

    var request = {
    origin: '31.405073, -110.611535',
    destination: '31.405148, -110.610998',
    travelMode: 'DRIVING', // or 'WALKING', 'TRANSIT', 'BICYCLING'
    waypoints: waypointsArray,
    optimizeWaypoints: true // Optional: Optimize the order of waypoints for the best route
};

directionsService.route(request, function(response, status) {
  if (status === 'OK') {
    var directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers:true});
    directionsRenderer.setDirections(response);
    directionsRenderer.setMap(map);
    animateRedCar(map);
  }
   directionsRenderer.setOptions({
      polylineOptions: {
         strokeColor: "red" // Set different colors for each route
       }
     });
});

//Blue road
  var directionsService = new google.maps.DirectionsService();

  var request = {
  origin: '31.403389, -110.590272',
  destination: '31.377398, -110.569969',
  travelMode: 'DRIVING', // or 'WALKING', 'TRANSIT', 'BICYCLING'
  optimizeWaypoints: true // Optional: Optimize the order of waypoints for the best route
};

directionsService.route(request, function(response, status) {
  if (status === 'OK') {
    var directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers:true});
    directionsRenderer.setDirections(response);
    directionsRenderer.setMap(map);
    animateBlueCar(map);
  }
   directionsRenderer.setOptions({
      polylineOptions: {
         strokeColor: "blue" // Set different colors for each route
       }
     });
});
//Green road
var directionsService = new google.maps.DirectionsService();

var request = {  
origin: '31.390953, -110.603824',
destination: '31.385413, -110.618101',
travelMode: 'DRIVING', // or 'WALKING', 'TRANSIT', 'BICYCLING'
optimizeWaypoints: true // Optional: Optimize the order of waypoints for the best route
};

directionsService.route(request, function(response, status) {
if (status === 'OK') {
  var directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers:true});
  directionsRenderer.setDirections(response);
  directionsRenderer.setMap(map);
  animateGreenCar(map);
}
 directionsRenderer.setOptions({
    polylineOptions: {
       strokeColor: "green" // Set different colors for each route
     }
   });
});
    window.initMap = initMap;
}


function animateRedCar(map) {
    var icon = {
        url: 'images/car.png', // Replace with the path to your icon image
        scaledSize: new google.maps.Size(35, 35) // Set the desired width and height
    };
    var carMarker = new google.maps.Marker({
        position: null,
        map: map,
        icon: icon // Replace with the path to your car icon image
    });
    setInterval(function() {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var arreglo = this.responseText.split(",");
                var lat = parseFloat(arreglo[0]);
                var lng = parseFloat(arreglo[1]);

                carMarker.setPosition({lat: lat, lng: lng});
            }
        }

        if (xhttp) {
            xhttp.open("GET", "CoordenadasCarroRojo", true);
            xhttp.send(null);
        }
        
    }, 1000); // Adjust the interval (in milliseconds) to control the speed of the animation
}

function animateBlueCar(map) {
    var icon = {
        url: 'images/car.png', // Replace with the path to your icon image
        scaledSize: new google.maps.Size(35, 35) // Set the desired width and height
    };
    var carMarker = new google.maps.Marker({
        position: null,
        map: map,
        icon: icon // Replace with the path to your car icon image
    });
    setInterval(function() {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var arreglo = this.responseText.split(",");
                var lat = parseFloat(arreglo[0]);
                var lng = parseFloat(arreglo[1]);

                carMarker.setPosition({lat: lat, lng: lng});
            }
        }

        if (xhttp) {
            xhttp.open("GET", "CoordenadasCarroAzul", true);
            xhttp.send(null);
        }
        
    }, 1000); // Adjust the interval (in milliseconds) to control the speed of the animation
}

function animateGreenCar(map) {
    var icon = {
        url: 'images/car.png', // Replace with the path to your icon image
        scaledSize: new google.maps.Size(35, 35) // Set the desired width and height
    };
    var carMarker = new google.maps.Marker({
        position: null,
        map: map,
        icon: icon // Replace with the path to your car icon image
    });
    setInterval(function() {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var arreglo = this.responseText.split(",");
                var lat = parseFloat(arreglo[0]);
                var lng = parseFloat(arreglo[1]);

                carMarker.setPosition({lat: lat, lng: lng});
            }
        }

        if (xhttp) {
            xhttp.open("GET", "CoordenadasCarroVerde", true);
            xhttp.send(null);
        }
        
    }, 1000); // Adjust the interval (in milliseconds) to control the speed of the animation
}