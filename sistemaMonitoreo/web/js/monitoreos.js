var xhttp;

function iniciarSesion() {
    let usuario = document.getElementById("txtUser").value;
    let password = document.getElementById("txtPassword").value;

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let usuario = this.responseText;

            if (usuario !== "{}") {
                window.location.replace("GenerarReporte.html");
            } else {
                alert("Ese usuario no existe");
            }
        }
    };

    if (xhttp) {
        xhttp.open("GET", "IniciarSesion?usuario=" + usuario + "&password=" + password, true);
        xhttp.send(null);
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