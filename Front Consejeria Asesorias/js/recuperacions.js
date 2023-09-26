function enviarRecuperacion() {
    const correo = document.getElementById("correoI").value;
    const url2 = `http://localhost:3002/usuarios/recuperacion?correo=${correo}`;
    fetch(ur2, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la petición');
            }
        })
        .then(data => {
            const miAlerta2 = document.getElementById("miAlerta2");
            miAlerta2.style.display = "block";
        })
        .catch(error => {
            const miAlerta = document.getElementById("miAlerta");
            miAlerta.style.display = "block";
            console.error("Error de conexión:", error);
        });
}

function cerrar() {
    const miAlerta = document.getElementById("miAlerta");
    miAlerta.style.display = "none";
}
function cerrar2() {
    const miAlerta2 = document.getElementById("miAlerta2");
    miAlerta2.style.display = "none";
    window.location.href = `login.html`;

}
