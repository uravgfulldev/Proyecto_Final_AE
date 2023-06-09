var xhttp;
var encabezados = ["Fehca", "Zona", "Materiales", "Cantidad (Kg)", "Conductores (Id)"];

function iniciarSesion() {
    let usuario = document.getElementById("txtUser").value;
    let password = document.getElementById("txtPassword").value;

    if (usuario.length !== 0 || password.length !== 0) {
        window.location.replace("Reportes.html");
    }
}

function recibirReporte() {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            let mensaje = JSON.parse(this.responseText);
            alert("Se ha generado un nuevo reporte");
            
            borraHijos("tabla");
            generaTabla("tabla", mensaje);
        }
    };

    if (xhttp) {
        xhttp.open("GET", "RecibirMensaje", true);
        xhttp.send(null);
    }
}

function borraHijos(elementoID) {
    let elemento = document.getElementById(elementoID);

    while (elemento.hasChildNodes()) {
        elemento.removeChild(elemento.firstChild);
    }
}

function generaTabla(padreID, mensaje) {
    let tabla = document.getElementById(padreID);
    
    let renglonEncabezados = document.createElement("tr");
    tabla.appendChild(renglonEncabezados);

    for (let encabezado of encabezados) {
        let celdaEncabezado = document.createElement("th");
        celdaEncabezado.innerHTML = encabezado;
        renglonEncabezados.appendChild(celdaEncabezado);
    }

    for (let elemento of mensaje) {
        let renglon = document.createElement("tr");
        tabla.appendChild(renglon);

        for (let llave in elemento) {
            let celda = document.createElement("td");

            celda.innerHTML = elemento[llave];

            renglon.appendChild(celda);
        }
    }
}