function mostrarElemento(id) {
    let elemento = document.getElementById(id);
    elemento.style.display = 'block';
}

function ocultarElemento(id) {
    let elemento = document.getElementById(id);
    elemento.style.display = 'none';
}
function motivo() {

}
function cerrar() {
    const miAlerta = document.getElementById("miAlerta");
    miAlerta.style.display = "none";
}
function cerrar3() {
    const miAlerta = document.getElementById("miAlerta3");
    miAlerta.style.display = "none";
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `menu.html?data=${encodedData}`;
}

function registrarTurno() {
    const hora = document.getElementById("horaTI");
    const minuto = document.getElementById("minutoTI");
    if (hora.value === "" || minuto.value === "") {
        const campos2 = [];
        if (hora.value === "") {
            campos2.push("Hora");
        }
        if (minuto.value === "") {
            campos2.push("Minutos");
        }
        const miAlerta = document.getElementById("miAlerta");
        miAlerta.style.display = "block";
        const mensajeModal = document.getElementById("mensajeModal");
        const tituloModal = document.getElementById("tituloModal")
        tituloModal.innerHTML = "Campos Faltantes:";
        const campos = campos2;

        let mensaje = "Faltan los siguientes campos:<ul>";

        for (let i = 0; i < campos.length; i++) {
            mensaje += `<li>${campos[i]}</li>`;
        }

        mensaje += "</ul>";

        mensajeModal.innerHTML = mensaje;
    } else {
        const asesoria = asesoriaGlobal;
        delete asesoria.turno;
        const turno = {};

        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const dia = String(fechaActual.getDate()).padStart(2, '0');
        const fecha_registro = `${año}-${mes}-${dia}`;
        turno.fecha_turno = fecha_registro
        turno.hora_turno = hora.value + ":" + minuto.value;
        asesoria.turno = turno;
        alert(JSON.stringify(asesoria));

        const options = {
            method: 'PUT',
            headers: {
                'Authorization': datosAnalizadosGlobal.token,
                'Content-Type': 'application/json' // Establecer el tipo de contenido a JSON
            },
            body: JSON.stringify(asesoria) // Convertir el objeto asesoria a JSON
        };

        // Realizar la solicitud AJAX utilizando fetch
        fetch('http://localhost:3000/asesorias/' + asesoria.datos_asesoria.id_asesoria, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const miAlerta = document.getElementById("miAlerta3");
                miAlerta.style.display = "block";
                const mensajeModal = document.getElementById("mensajeModal3");
                const tituloModal = document.getElementById("tituloModal3")
                tituloModal.innerHTML = "Turnado de Asesoria:";
                let mensaje = "El registro del turno de la asesoria se ha realizado correctamente.";
                mensajeModal.innerHTML = mensaje;

            })
            .catch(error => {
                const miAlerta = document.getElementById("miAlerta");
                miAlerta.style.display = "block";
                const mensajeModal = document.getElementById("mensajeModal");
                const tituloModal = document.getElementById("tituloModal")
                tituloModal.innerHTML = "Mensaje Error:";
                let mensaje = "Error durante el registro.";
                mensajeModal.innerHTML = mensaje;
                console.error('Error al obtener con el turnado', error);
            });

    }


}
// Función para obtener los parámetros de la URL
function obtenerParametrosURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    return data;
}
function obtenerAsesoria() {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('asesoria');
    return data;
}
function obtenerDataColonia() {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('dataColonia');
    return data;
}
// Función para decodificar y analizar el JSON
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

// Declarar una variable global para almacenar los datos
let datosAnalizadosGlobal = null;
let asesoriaGlobal = null;
let datosColoniaGlobal = null;
// Función para redirigir a la página de inicio de sesión si no hay datos
function redirigirSiNoHayDatos() {
    const data = obtenerParametrosURL();
    const datosAnalizados = analizarDatosJSON(data);
    const dataAsesoria = obtenerAsesoria();

    const dataColonia = obtenerDataColonia();

    const asesoria = analizarDatosJSON(dataAsesoria);
    const datosColonia = analizarDatosJSON(dataColonia);

    if (!datosAnalizados) {
        window.location.href = 'login.html';
    } else {
        const usuario = document.getElementById("user-name");
        const nombreCompleto = datosAnalizados.name;
        const palabras = nombreCompleto.split(" ");
        const primerNombre = palabras[0];

        usuario.innerHTML = primerNombre;
        const responsableTurno = document.getElementById("responsableTurnoTI");
        responsableTurno.innerHTML = nombreCompleto;
        // Almacenar los datos en la variable global
        datosAnalizadosGlobal = datosAnalizados;
        asesoriaGlobal = asesoria.asesoria;
        datosColoniaGlobal = datosColonia.colonia;
        rellenarAsesoria(asesoriaGlobal);
        rellenarDataColonia(datosColoniaGlobal);
        asesores();

        // Eliminar los parámetros de la URL
        if (history.replaceState) {
            const nuevaURL = window.location.pathname; // Obtener la ruta de la página actual
            history.replaceState({}, document.title, nuevaURL);
        }
    }
}
function asesores() {
    fetch('http://localhost:3000/asesores', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${datosAnalizadosGlobal.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const selectAsesor = document.getElementById('nombreDeAsesorTI');
            data.asesores.forEach(asesor => {
                const option = document.createElement('option');
                option.value = asesor.id_asesor;
                option.textContent = asesor.nombre_asesor;
                selectAsesor.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener los asesores:', error));

}
function rellenarAsesoria(asesoria) {
    // Crea variables para cada campo y asigna "----------" si el campo está ausente o es null
    const nombre = asesoria.persona.nombre || "----------";
    const apellidoPaterno = asesoria.persona.apellido_paterno || "----------";
    const apellidoMaterno = asesoria.persona.apellido_materno || "----------";
    const edad = asesoria.persona.edad || "----------";
    const sexo = asesoria.persona.genero.descripcion_genero || "----------";
    const calle = asesoria.persona.domicilio.calle_domicilio || "----------";
    const numExterior = asesoria.persona.domicilio.numero_exterior_domicilio || "----------";
    const numInterior = asesoria.persona.domicilio.numero_interior_domicilio || "----------";
    // Accede al elemento HTML del resumen de hechos y asigna el valor o "----------"
    const resumenHechos = asesoria.datos_asesoria.resumen_asesoria || "----------";
    const nombreCompleto = asesoria.datos_asesoria.usuario;
    const asesorID = asesoria.asesor.id_asesor;
    const turnoID = asesoria.turno || "00";
    if (turnoID !== "00") {
        const [horas, minutos] = turnoID.hora_turno.split(":");

        // Obtener los elementos HTML por sus IDs
        const horaInput = document.getElementById("horaTI");
        const minutoInput = document.getElementById("minutoTI");

        // Asignar los valores a los elementos HTML
        horaInput.value = horas;
        minutoInput.value = minutos;
    }
    var checkbox = document.getElementById("turnadoTI");

    // Establece el estado 'checked' del checkbox a true (marcarlo)
    checkbox.checked = true;
    document.getElementById("nombreDeAsesorTI").selectedIndex = asesorID;

    document.getElementById("responsableTurnoTI").innerHTML = nombreCompleto;
    document.getElementById("resumenHechosTI").innerHTML = resumenHechos;
    document.getElementById("nombreTI").innerHTML = nombre;
    document.getElementById("apellidoPaternoTI").innerHTML = apellidoPaterno;
    document.getElementById("apellidoMaternoTI").innerHTML = apellidoMaterno;
    document.getElementById("edadTI").innerHTML = edad;
    document.getElementById("sexoTI").innerHTML = sexo;
    document.getElementById("calleTI").innerHTML = calle;
    document.getElementById("numExteriorTI").innerHTML = numExterior;
    document.getElementById("numInteriorTI").innerHTML = numInterior;
}

function rellenarDataColonia(datosColonia) {
    // Crea variables para cada campo y asigna "----------" si el campo está ausente o es null
    const codigoPostal = datosColonia.codigo_postal.codigo_postal || "----------";
    const estado = datosColonia.estado.nombre_estado || "----------";
    const municipio = datosColonia.municipio.nombre_municipio || "----------";
    const ciudad = datosColonia.ciudad.nombre_ciudad || "----------";
    const colonia = datosColonia.colonia.nombre_colonia || "----------";

    // Accede a los elementos HTML correspondientes y asigna el valor de las variables
    document.getElementById("codigoPostalTI").innerHTML = codigoPostal;
    document.getElementById("estadoTI").innerHTML = estado;
    document.getElementById("municipioTI").innerHTML = municipio;
    document.getElementById("ciudadTI").innerHTML = ciudad;
    document.getElementById("coloniaTI").innerHTML = colonia;
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
window.addEventListener('load', redirigirSiNoHayDatos);