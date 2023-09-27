  // Función para obtener los parámetros de la URL
  function obtenerParametrosURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
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

// Función para redirigir a la página de inicio de sesión si no hay datos
function redirigirSiNoHayDatos() {
    const data = obtenerParametrosURL();
    const datosAnalizados = analizarDatosJSON(data);
    if (!datosAnalizados) {
        window.location.href = 'login.html';
    } else {
        // Analizar Token 
        const usuario = document.getElementById("user-name");
        const nombreCompleto = datosAnalizados.name;
        const palabras = nombreCompleto.split(" ");
        const primerNombre = palabras[0];

        usuario.innerHTML = primerNombre;

        // Almacenar los datos en la variable global
        datosAnalizadosGlobal = datosAnalizados;

        // Eliminar los parámetros de la URL
        if (history.replaceState) {
            const nuevaURL = window.location.pathname; // Obtener la ruta de la página actual
            history.replaceState({}, document.title, nuevaURL);
        }
    }
}
function salir(){
    window.location.href = `login.html?`;
}
function turnar() {
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `busqueda-turnar.html?data=${encodedData}`;
}
function consultar() {
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `consulta.html?data=${encodedData}`;
}
function asesoria() {
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `asesoria.html?data=${encodedData}`;
}

// Llamar a la función de redirección al cargar la página
window.addEventListener('load', redirigirSiNoHayDatos);