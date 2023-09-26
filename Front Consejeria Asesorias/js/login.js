function ingresar() {
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;
    const url = `http://localhost:3002/usuarios/usuario?correo=${usuario}&password=${contraseña}`;

    fetch(url, {
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
            const dataString = JSON.stringify(data);
            const encodedData = encodeURIComponent(dataString);
            window.location.href = `menu.html?data=${encodedData}`;
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

