
let datosAnalizadosGlobal = null;

function redirigirSiNoHayDatos() {
        // Obtener los valores de los campos
        const nombre = document.getElementById("nombreAsesoradoBTI").value;
        const apellidoPaterno = document.getElementById("paternoAsesoradoBTI").value;
        const apellidoMaterno = document.getElementById("maternoAsesoradoBTI").value;
        nombre.value = "";
        apellidoPaterno.value = "";
        apellidoMaterno.value = "";

    const data = obtenerParametrosURL();
    const datosAnalizados = analizarDatosJSON(data);
    if (!datosAnalizados) {
        window.location.href = 'login.html';
    } else {

        const usuario = document.getElementById("user-name");
        const nombreCompleto = datosAnalizados.name;
        const palabras = nombreCompleto.split(" ");
        const primerNombre = palabras[0];

        usuario.innerHTML = primerNombre;

        datosAnalizadosGlobal = datosAnalizados;

        if (history.replaceState) {
            const nuevaURL = window.location.pathname; // Obtener la ruta de la página actual
            history.replaceState({}, document.title, nuevaURL);
        }
    }
}
function obtenerParametrosURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    return data;
}

function analizarDatosJSON(data) {
    if (data) {
        try {
            const decodedData = decodeURIComponent(data);
            const jsonData = JSON.parse(decodedData);
            return jsonData;
        } catch (error) {
            console.error('Error al analizar los datos JSON:', error);
        }
    }
    return null;
}
window.addEventListener('load', redirigirSiNoHayDatos);

function buscarAsesoria() {
    // Obtener los valores de los campos
    const nombre = document.getElementById("nombreAsesoradoBTI").value;
    const apellidoPaterno = document.getElementById("paternoAsesoradoBTI").value;
    const apellidoMaterno = document.getElementById("maternoAsesoradoBTI").value;

    // Verificar si alguno de los campos está vacío
    if (nombre === "" || apellidoPaterno === "" || apellidoMaterno === "") {
        const campos = [];
        if (nombre === "") {
            campos.push("nombre");
        }
        if (apellidoPaterno === "") {
            campos.push("apellido paterno");
        }
        if (apellidoMaterno === "") {
            campos.push("apellido materno");
        }
        const miAlerta = document.getElementById("miAlerta");
        miAlerta.style.display = "block";
        const mensajeModal = document.getElementById("mensajeModal");
        const tituloModal = document.getElementById("tituloModal")
        tituloModal.innerHTML = "Campos Faltantes Busqueda:";


        let mensaje = "Faltan los siguientes campos:<ul>";

        for (let i = 0; i < campos.length; i++) {
            mensaje += `<li>${campos[i]}</li>`;
        }

        mensaje += "</ul>";

        mensajeModal.innerHTML = mensaje;

    } else {

        // Crear la URL de consulta con los valores
        const url = `http://localhost:3000/asesorias/buscar?nombre=${encodeURIComponent(nombre)}&apellido_paterno=${encodeURIComponent(apellidoPaterno)}&apellido_materno=${encodeURIComponent(apellidoMaterno)}`;

        // Crear un objeto de opciones para la solicitud fetch
        const opciones = {
            method: 'GET', // Método GET
            headers: {
                'Authorization': `Bearer ${datosAnalizadosGlobal.token}` // Agregar el token en el encabezado
            }
        };

        // Realizar la solicitud HTTP usando fetch

        fetch(url, opciones)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Obtener los valores de los campos
                const nombre = document.getElementById("nombreAsesoradoBTI").value;
                const apellidoPaterno = document.getElementById("paternoAsesoradoBTI").value;
                const apellidoMaterno = document.getElementById("maternoAsesoradoBTI").value;
                nombre.value = "";
                apellidoPaterno.value = "";
                apellidoMaterno.value = "";
                const asesoria = JSON.parse(JSON.stringify(data));
                if (asesoria) {
                    const idColonia = data.asesoria.persona.domicilio.id_colonia;
                    fetch(`http://localhost:3001/colonias/${idColonia}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${datosAnalizadosGlobal.token}`
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Error en la solicitud: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(dataColonia => {

                            const dataPermisos = JSON.stringify(datosAnalizadosGlobal);
                            const encodedDataPermisos = encodeURIComponent(dataPermisos);
                            const dataColoniaB = JSON.stringify(dataColonia);
                            const encodedDataColoniaB = encodeURIComponent(dataColoniaB);
                            const dataAsesoria = JSON.stringify(asesoria);
                            const encodedDataAsesoria = encodeURIComponent(dataAsesoria);
                            window.location.href = `turnar.html?asesoria=${encodedDataAsesoria}&dataColonia=${encodedDataColoniaB}&data=${encodedDataPermisos}`;
                        }).catch(error => {
                            console.error("Error:", error);
                        });
                }
            })
            .catch(error => {
                const miAlerta = document.getElementById("miAlerta");
                miAlerta.style.display = "block";
                const mensajeModal = document.getElementById("mensajeModal");
                const tituloModal = document.getElementById("tituloModal")
                tituloModal.innerHTML = "Error Busqueda:";
                mensajeModal.innerHTML = "No existen asesorias con ese nombre.";
                // Obtener los valores de los campos
                const nombre = document.getElementById("nombreAsesoradoBTI").value;
                const apellidoPaterno = document.getElementById("paternoAsesoradoBTI").value;
                const apellidoMaterno = document.getElementById("maternoAsesoradoBTI").value;
                nombre.value = "";
                apellidoPaterno.value = "";
                apellidoMaterno.value = "";
            });
    }

}

function mostrarElemento(id) {
    let elemento = document.getElementById(id);
    elemento.style.display = 'block';
}

function ocultarElemento(id) {
    let elemento = document.getElementById(id);
    elemento.style.display = 'none';
}


function obtenerParametrosURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    return data;
}

function analizarDatosJSON(data) {
    if (data) {
        try {
            const decodedData = decodeURIComponent(data);
            const jsonData = JSON.parse(decodedData);
            return jsonData;
        } catch (error) {
            console.error('Error al analizar los datos JSON:', error);
        }
    }
    return null;
}

function asesoria() {
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `asesoria.html?data=${encodedData}`;
}
function menu() {
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `menu.html?data=${encodedData}`;
}


function cerrar() {
    const miAlerta = document.getElementById("miAlerta");
    miAlerta.style.display = "none";
}