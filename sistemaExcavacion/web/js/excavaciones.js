var xhttp;

function iniciarSesion() {
    let usuario = document.getElementById("txtUser").value;
    let password = document.getElementById("txtPassword").value;

    if (usuario.length !== 0 || password.length !== 0) {
        window.location.replace("");
    }
}