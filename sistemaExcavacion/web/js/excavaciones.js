var xhttp;

function iniciarSesion() {
    let usuario = document.getElementById("txtUser").value;
    let password = document.getElementById("txtPassword").value;

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let usuario = this.responseText;

            if (usuario !== "{}") {
                window.location.replace(""); // add later
            } else {
                alert("Ese usuario no existe");
            }
        }
    };

    if (xhttp) {
        xhttp.open("GET", "IniciarSesion?usuario=" + usuario + "&password=" + password);
        xhttp.send(null);
    }
}