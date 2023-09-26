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

function registrarTurno() {
    alert(JSON.stringify(asesoriaGlobal));
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

        // Almacenar los datos en la variable global
        datosAnalizadosGlobal = datosAnalizados;
        asesoriaGlobal = asesoria.asesoria;
        datosColoniaGlobal = datosColonia.colonia;
        rellenarAsesoria(asesoriaGlobal);
        rellenarDataColonia(datosColoniaGlobal);

        // Eliminar los parámetros de la URL
        if (history.replaceState) {
            const nuevaURL = window.location.pathname; // Obtener la ruta de la página actual
            history.replaceState({}, document.title, nuevaURL);
        }
    }
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
    document.getElementById("resumenHechosTI").innerHTML = resumenHechos;

    // Accede a los elementos HTML correspondientes y asigna el valor de las variables
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