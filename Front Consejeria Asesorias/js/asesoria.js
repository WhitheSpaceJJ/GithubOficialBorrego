
function rellenarAsesorJuicio() {
    fetch('http://localhost:3000/asesores', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${datosAnalizadosGlobal.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const selectAsesor = document.getElementById('nombreAsesorIT1');
            data.asesores.forEach(asesor => {
                const option = document.createElement('option');
                option.value = asesor.id_asesor;
                option.textContent = asesor.nombre_asesor;
                selectAsesor.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener los asesores:', error));

    // Realizar la petición para obtener los tipos de juicio
    fetch('http://localhost:3000/tipos-de-juicio', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${datosAnalizadosGlobal.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const selectTipoJuicio = document.getElementById('tipoJuicioIT1');
            data.tiposDeJuicio.forEach(tipoJuicio => {
                const option = document.createElement('option');
                option.value = tipoJuicio.id_tipo_juicio;
                option.textContent = tipoJuicio.tipo_juicio;
                selectTipoJuicio.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener los tipos de juicio:', error));
}
function generosEstados() {

    fetch('http://localhost:3000/generos', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${datosAnalizadosGlobal.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const selectGenero = document.getElementById('sexoIT2');
            data.generos.forEach(genero => {
                const option = document.createElement('option');
                option.value = genero.id_genero;
                option.textContent = genero.descripcion_genero;
                selectGenero.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener los géneros:', error));

    // Realizar la petición para obtener los estados civiles
    fetch('http://localhost:3000/estados-civiles', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${datosAnalizadosGlobal.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const selectEstadoCivil = document.getElementById('estadoCivilIT2');
            data.estadosCiviles.forEach(estadoCivil => {
                const option = document.createElement('option');
                option.value = estadoCivil.id_estado_civil;
                option.textContent = estadoCivil.estado_civil;
                selectEstadoCivil.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener los estados civiles:', error));
}


function motivoSelect() {
    // Realizar la petición para obtener los motivos
    fetch('http://localhost:3000/motivos', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${datosAnalizadosGlobal.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const selectMotivo = document.getElementById('motivoIT2');
            data.motivos.forEach(motivo => {
                const option = document.createElement('option');
                option.value = motivo.id_motivo;
                option.textContent = motivo.descripcion_motivo;
                selectMotivo.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener los motivos:', error));
}
function mostrarElemento(id) {
    let elemento = document.getElementById(id);
    elemento.style.display = 'block';


}

function ocultarElemento(id) {
    let elemento = document.getElementById(id);
    elemento.style.display = 'none';

}

function validarCodigoPostal() {
    // Obtener el valor ingresado en el campo de código postal
    const codigoPostal = document.getElementById('codigoPostalIT2').value;

    // Realizar la petición para obtener los datos del código postal
    fetch(`http://localhost:3001/codigospostales/cp/${codigoPostal}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${datosAnalizadosGlobal.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            // Llenar los campos con los resultados obtenidos
            document.getElementById('txtEstadoIT2').value = data.colonias.estado.nombre_estado;
            document.getElementById('txtMunicipioIT2').value = data.colonias.municipio.nombre_municipio;
            document.getElementById('txtCiudadIT2').value = data.colonias.ciudad.nombre_ciudad;

            // Limpiar el select de colonias
            const coloniaSelect = document.getElementById('cbColoniaIT2');
            coloniaSelect.innerHTML = '';

            // Llenar el select de colonias con las colonias encontradas
            data.colonias.colonias.forEach(colonia => {
                const option = document.createElement('option');
                option.value = colonia.id_colonia;
                option.textContent = colonia.nombre_colonia;
                coloniaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener los datos del código postal:', error));
}


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

        const usuario = document.getElementById("user-name");
        const nombreCompleto = datosAnalizados.name;
        const palabras = nombreCompleto.split(" ");
        const primerNombre = palabras[0];

        usuario.innerHTML = primerNombre;

        // Almacenar los datos en la variable global
        datosAnalizadosGlobal = datosAnalizados;
        rellenarAsesorJuicio();
        generosEstados();
        motivoSelect();
        // Eliminar los parámetros de la URL
        if (history.replaceState) {
            const nuevaURL = window.location.pathname; // Obtener la ruta de la página actual
            history.replaceState({}, document.title, nuevaURL);
        }
    }
}
function turnar() {
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `busqueda-turnar.html?data=${encodedData}`;
}

function menu() {
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `menu.html?data=${encodedData}`;
}

function turnar() {
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `busqueda-turnar.html?data=${encodedData}`;
}
function salir(){
    window.location.href = `login.html?`;
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


function validarCamposAsesoria() {
    //const nombreAsesorNT1 = document.getElementById("nombreAsesorIT1");
    //const tipoJuicioNT1 = document.getElementById("tipoJuicioIT1");

    const resumenHechoNT1 = document.getElementById("resumenHechoIT1");
    if (resumenHechoNT1.value.trim() === "") {
        return false;
    }

    const conclusionNT1 = document.getElementById("conclusionIT1");
    if (conclusionNT1.value.trim() === "") {
        return false;
    }
    const recibio1NT1 = document.getElementById("recibio1IT1");
    const recibio2NT1 = document.getElementById("recibio2IT1");
    const recibio3NT1 = document.getElementById("recibio3IT1");
    if (!recibio1NT1.checked && !recibio2NT1.checked && !recibio3NT1.checked) {
        return false;
    }
    const confirmacionCumpleIT1 = document.getElementById("confirmacionCumpleIT1");
    const negacionCumpleIT1 = document.getElementById("negacionCumpleIT1");

    if (confirmacionCumpleIT1.checked || negacionCumpleIT1.checked) {
        // Al menos uno de los radio buttons está seleccionado
        // Tu código aquí si al menos uno está seleccionado
    } else {
        return false;
    }
    return true;
}
function obtenerCamposFaltantesAsesoria() {
    //const nombreAsesorNT1 = document.getElementById("nombreAsesorIT1");
    //const tipoJuicioNT1 = document.getElementById("tipoJuicioIT1");
    const elementos = [];


    //    resumenHechoIT1
    //              conclusionIT1
    const resumenHechoNT1 = document.getElementById("resumenHechoIT1");
    if (resumenHechoNT1.value.trim() === "") {
        elementos.push("Resumen Hechos");
    }

    const conclusionNT1 = document.getElementById("conclusionIT1");
    if (conclusionNT1.value.trim() === "") {
        elementos.push("Conclusion");
    }
    const recibio1NT1 = document.getElementById("recibio1IT1");
    const recibio2NT1 = document.getElementById("recibio2IT1");
    const recibio3NT1 = document.getElementById("recibio3IT1");
    if (!recibio1NT1.checked && !recibio2NT1.checked && !recibio3NT1.checked) {
        // Todos los checkboxes están desmarcados (no checked)
        elementos.push("Requisitos");
    }
    const confirmacionCumpleIT1 = document.getElementById("confirmacionCumpleIT1");
    const negacionCumpleIT1 = document.getElementById("negacionCumpleIT1");

    if (confirmacionCumpleIT1.checked || negacionCumpleIT1.checked) {
        // Al menos uno de los radio buttons está seleccionado
        // Tu código aquí si al menos uno está seleccionado
    } else {

        elementos.push("Confimacion Pregunta");
    }
    return elementos;
}

function validarCamposAsesorado() {
    const elementos = [];
    const nombreAsesoradoIT2 = document.getElementById("nombreAsesoradoIT2");
    if (nombreAsesoradoIT2 === null) {
        return false;
    }

    const apellidoPaternoAsesoradoIT2 = document.getElementById("apellidoPaternoAsesoradoIT2");
    if (apellidoPaternoAsesoradoIT2 === null) {
        return false;
    }

    const apellidoMaternoAsesoradoIT2 = document.getElementById("apellidoMaternoAsesoradoIT2");
    if (apellidoMaternoAsesoradoIT2 === null) {
        return false;
    }

    const edadIT2 = document.getElementById("edadIT2");
    if (edadIT2 === null) {
        return false;
    }

    const telefonoAsesoradoIT2 = document.getElementById("telefonoAsesoradoIT2");
    if (telefonoAsesoradoIT2 === null) {
        return false;
    }
    const trabajaSiIT2 = document.getElementById("trabajaSiIT2");
    const trabajaNoIT2 = document.getElementById("trabajaNoIT2");
    const menorOptionIT2 = document.getElementById("menorOptionIT2");
    const mayorOptionIT2 = document.getElementById("mayorOptionIT2");
    if (trabajaSiIT2.checked || trabajaNoIT2.checked) {
        // Al menos uno de los radio buttons está seleccionado
        // Tu código aquí si al menos uno está seleccionado
        if (trabajaSiIT2.checked) {

            if (menorOptionIT2.checked || mayorOptionIT2.checked) {

            } else {
                return false;
            }

        }
    } else {
        return false;
    }

    const numHijosIT2 = document.getElementById("numHijosIT2");
    if (numHijosIT2 === null) {
        return false;
    }
    const calleIT2 = document.getElementById("calleIT2");
    if (calleIT2 === null) {
        return false;
    }
    const numExteriorIT2 = document.getElementById("numExteriorIT2");
    if (numExteriorIT2 === null) {
        return false;
    }

    const cbColoniaIT2 = document.getElementById("cbColoniaIT2");
    if (cbColoniaIT2 === null) {
        return false;
    }
    return true;
}
function obtenerCamposFaltantesAsesorado() {
    // Obtener todos los elementos del segundo tab
    const elementos = [];
    const nombreAsesoradoIT2 = document.getElementById("nombreAsesoradoIT2");
    if (nombreAsesoradoIT2.value === "") {
        elementos.push("Nombre");
    }

    const apellidoPaternoAsesoradoIT2 = document.getElementById("apellidoPaternoAsesoradoIT2");
    if (apellidoPaternoAsesoradoIT2.value === "") {
        elementos.push("Apellido Paterno");
    }

    const apellidoMaternoAsesoradoIT2 = document.getElementById("apellidoMaternoAsesoradoIT2");
    if (apellidoMaternoAsesoradoIT2.value === "") {
        elementos.push("Apellido Materno");
    }

    const edadIT2 = document.getElementById("edadIT2");
    if (edadIT2.value === "") {
        elementos.push("Edad");
    }

    const telefonoAsesoradoIT2 = document.getElementById("telefonoAsesoradoIT2");
    if (telefonoAsesoradoIT2.value === "") {
        elementos.push("Telefono");
    }
    const trabajaSiIT2 = document.getElementById("trabajaSiIT2");
    const trabajaNoIT2 = document.getElementById("trabajaNoIT2");
    const menorOptionIT2 = document.getElementById("menorOptionIT2");
    const mayorOptionIT2 = document.getElementById("mayorOptionIT2");
    if (trabajaSiIT2.checked || trabajaNoIT2.checked) {
        // Al menos uno de los radio buttons está seleccionado
        // Tu código aquí si al menos uno está seleccionado
        if (trabajaSiIT2.checked) {

            if (menorOptionIT2.checked || mayorOptionIT2.checked) {

            } else {
                elementos.push("Ingreso Asesorado");
            }

        }
    } else {

        elementos.push("Confimacion Trabajo");
    }

    const numHijosIT2 = document.getElementById("numHijosIT2");
    if (numHijosIT2.value === "") {
        elementos.push("Numero Hijos");
    }
    const calleIT2 = document.getElementById("calleIT2");
    if (calleIT2.value === "") {
        elementos.push("Calle");
    }
    const numExteriorIT2 = document.getElementById("numExteriorIT2");
    if (numExteriorIT2.value === "") {
        elementos.push("Numero Exterior");
    }

    const cbColoniaIT2 = document.getElementById("cbColoniaIT2");
    if (cbColoniaIT2.value === "") {
        elementos.push("Colonia");
    }
    return elementos;
}

function validarRegistro() {
    return false;
}
function cerrar() {
    const miAlerta = document.getElementById("miAlerta");
    miAlerta.style.display = "none";
}
function cerrar3() {
    const miAlerta = document.getElementById("miAlerta");
    miAlerta.style.display = "none";
    const dataString = JSON.stringify(datosAnalizadosGlobal);
    const encodedData = encodeURIComponent(dataString);
    window.location.href = `menu.html?data=${encodedData}`;
}

function validacionAsesoria() {
    const validacionAsesoria = validarCamposAsesoria();
    if (validacionAsesoria === false) {
        const miAlerta = document.getElementById("miAlerta");
        miAlerta.style.display = "block";
        const mensajeModal = document.getElementById("mensajeModal");
        const tituloModal = document.getElementById("tituloModal")
        tituloModal.innerHTML = "Campos Faltantes Asesoria:";
        const campos = obtenerCamposFaltantesAsesoria();

        let mensaje = "Faltan los siguientes campos:<ul>";

        for (let i = 0; i < campos.length; i++) {
            mensaje += `<li>${campos[i]}</li>`;
        }

        mensaje += "</ul>";

        mensajeModal.innerHTML = mensaje;

    } else {
        const asesoradoTab = document.getElementById("tab2");
        asesoradoTab.style.display = "block";
        // Redirecciona a la pestaña con ID "tab2"
        window.location.href = "#tab2";
    }
}

function valiarAsesorado() {
    const validacionAsesorado = validarCamposAsesorado();
    if (validacionAsesorado === false) {
        const miAlerta = document.getElementById("miAlerta");
        miAlerta.style.display = "block";
        const mensajeModal = document.getElementById("mensajeModal");
        const tituloModal = document.getElementById("tituloModal")
        tituloModal.innerHTML = "Campos Faltantes Asesorado:";
        const campos = obtenerCamposFaltantesAsesorado();

        let mensaje = "Faltan los siguientes campos:<ul>";

        for (let i = 0; i < campos.length; i++) {
            mensaje += `<li>${campos[i]}</li>`;
        }

        mensaje += "</ul>";

        mensajeModal.innerHTML = mensaje;
    } else {
        rellenarDatosVerificacion();
        const asesoradoTab = document.getElementById("tab1");
        asesoradoTab.style.display = "block";
        // Redirecciona a la pestaña con ID "tab2"
        window.location.href = "#tab1";
    }
}

window.addEventListener('load', redirigirSiNoHayDatos);
function desaparecerAsesoradoRegistro() {
    const asesoradoTab = document.getElementById("tab2");
    asesoradoTab.style.display = "none";
    const registroTab = document.getElementById("tab1");
    registroTab.style.display = "none";

}
function desaparecerRegistro() {
    const registroTab = document.getElementById("tab1");
    registroTab.style.display = "none";
}


function registarAsesoria() {
    const asesoria = {};
    //Persona
    const persona = {};
    const nombreAsesorado = document.getElementById("nombreAsesoradoIT2").value;
    persona.nombre = nombreAsesorado;
    const apellidoPaternoAsesorado = document.getElementById("apellidoPaternoAsesoradoIT2").value;
    persona.apellido_materno = apellidoPaternoAsesorado;
    const apellidoMaternoAsesorado = document.getElementById("apellidoMaternoAsesoradoIT2").value;
    persona.apellido_paterno = apellidoMaternoAsesorado;
    const edad = document.getElementById("edadIT2").value;
    persona.edad = parseInt(edad, 10);
    const telefonoAsesorado = document.getElementById("telefonoAsesoradoIT2").value;
    persona.telefono = telefonoAsesorado;
    const domicilio = {};
    const calle = document.getElementById("calleIT2").value;
    domicilio.calle_domicilio = calle;
    const numExterior = document.getElementById("numExteriorIT2").value;
    domicilio.numero_exterior_domicilio = numExterior;
    const numInterior = document.getElementById("numInteriorIT2").value;
    domicilio.numero_interior_domicilio = numInterior;
    const cbColonia = document.getElementById("cbColoniaIT2").value;
    domicilio.id_colonia = parseInt(cbColonia, 10);
    persona.domicilio = domicilio;
    const genero = {};
    const sexo = document.getElementById("sexoIT2").value;
    genero.id_genero = parseInt(sexo, 10);
    persona.genero = genero;
    asesoria.persona = persona;

    const datos_asesoria = {};
    //datos-asesoria
    const resumenHecho = document.getElementById("resumenHechoIT1").value;
    datos_asesoria.resumen_asesoria = resumenHecho;
    const conclusion = document.getElementById("conclusionIT1").value;
    datos_asesoria.conclusion_asesoria = conclusion;
    const confirmacionCumple = document.getElementById("confirmacionCumpleIT1").checked;
    const negacionCumple = document.getElementById("negacionCumpleIT1").checked;
    const estatus_requisitos = confirmacionCumple ? true : negacionCumple ? false : "nada";
    datos_asesoria.estatus_requisitos = estatus_requisitos;
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const fecha_registro = `${año}-${mes}-${dia}`;
    datos_asesoria.fecha_registro = fecha_registro;
    const usuario = datosAnalizadosGlobal.name;
    datos_asesoria.usuario = usuario;
    asesoria.datos_asesoria = datos_asesoria;

    const asesor = {}
    //Asesor
    const nombreAsesor = document.getElementById("nombreAsesorIT1").value;
    asesor.id_asesor = parseInt(nombreAsesor, 10);
    asesoria.asesor = asesor;

    //Turno
    asesoria.turno = null;


    //Recibidos
    const recibio1 = document.getElementById("recibio1IT1").checked;
    const recibio2 = document.getElementById("recibio2IT1").checked;
    const recibio3 = document.getElementById("recibio3IT1").checked;
    const recibidos = [];
    if (recibio1) {
        recibidos.push({ id_catalogo: 1 }); // Agrega el id_catalogo 1
    }

    if (recibio2) {
        recibidos.push({ id_catalogo: 2 }); // Agrega el id_catalogo 2
    }

    if (recibio3) {
        recibidos.push({ id_catalogo: 3 }); // Agrega el id_catalogo 3
    }
    asesoria.recibidos = recibidos;

    const tipos_juicio = {};
    //tipo-juicio
    const tipoJuicioAplica = document.getElementById("tipoJuicioIT1").value;
    tipos_juicio.id_tipo_juicio = parseInt(tipoJuicioAplica, 10);
    asesoria.tipos_juicio = tipos_juicio;

    const asesorado = {};
    //asesorado
    const motivoNoTrabajo = document.getElementById("motivoIT2").value;
    const trabajaSi = document.getElementById("trabajaSiIT2").checked;
    const trabajaNo = document.getElementById("trabajaNoIT2").checked;
    const opcionSeleccionada = trabajaSi ? true : trabajaNo ? false : "nada";
    asesorado.estatus_trabajo = opcionSeleccionada;
    const ingresoMenor = document.getElementById("menorOptionIT2").value;
    const ingresoMayor = document.getElementById("mayorOptionIT2").value;
    const ingresoSeleccionado = ingresoMenor ? 9999 : ingresoMayor ? 10001 : "nada";
    if (trabajaNo) {
        const motivo = {};
        motivo.id_motivo = parseInt(motivoNoTrabajo, 10);
        asesorado.motivo = motivo;
    }
    if (trabajaSi) {
        asesorado.ingreso_mensual = parseFloat(ingresoSeleccionado);
    }
    const numHijos = document.getElementById("numHijosIT2").value;
    asesorado.numero_hijos = parseInt(numHijos, 10);
    const estado_civil = {};
    const estadoCivil = document.getElementById("estadoCivilIT2").value;
    estado_civil.id_estado_civil = parseInt(estadoCivil, 10);
    asesorado.estado_civil = estado_civil;
    asesoria.asesorado = asesorado;
    // Crear un objeto de opciones de la solicitud
    const options = {
        method: 'POST',
        headers: {
            'Authorization': datosAnalizadosGlobal.token,
            'Content-Type': 'application/json' // Establecer el tipo de contenido a JSON
        },
        body: JSON.stringify(asesoria) // Convertir el objeto asesoria a JSON
    };

    // Realizar la solicitud AJAX utilizando fetch
    fetch('http://localhost:3000/asesorias', options)
        .then(response => response.json())
        .then(data => {
            const miAlerta = document.getElementById("miAlerta3");
            miAlerta.style.display = "block";
            const mensajeModal = document.getElementById("mensajeModal3");
            const tituloModal = document.getElementById("tituloModal3")
            tituloModal.innerHTML = "Registro de Asesoria:";
            let mensaje = "El registro de la asesoria se ha realizado correctamente.";
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
            console.error('Error al obtener los motivos:', error);
        });



}


function rellenarDatosVerificacion() {
    //Datos
    const nombreAsesorado = document.getElementById("nombreAsesoradoIT2");
    const apellidoPaternoAsesorado = document.getElementById("apellidoPaternoAsesoradoIT2");
    const apellidoMaternoAsesorado = document.getElementById("apellidoMaternoAsesoradoIT2");
    const edad = document.getElementById("edadIT2");
    const sexo = document.getElementById("sexoIT2");
    const telefonoAsesorado = document.getElementById("telefonoAsesoradoIT2");
    const trabajaSi = document.getElementById("trabajaSiIT2");
    const trabajaNo = document.getElementById("trabajaNoIT2");
    const ingresoMenor = document.getElementById("menorOptionIT2");
    const ingresoMayor = document.getElementById("mayorOptionIT2");
    const motivoNoTrabajo = document.getElementById("motivoIT2");
    const estadoCivil = document.getElementById("estadoCivilIT2");
    const numHijos = document.getElementById("numHijosIT2");
    const calle = document.getElementById("calleIT2");
    const numExterior = document.getElementById("numExteriorIT2");
    const numInterior = document.getElementById("numInteriorIT2");
    const codigoPostal = document.getElementById("codigoPostalIT2");
    const txtEstado = document.getElementById("txtEstadoIT2");
    const txtMunicipio = document.getElementById("txtMunicipioIT2");
    const txtCiudad = document.getElementById("txtCiudadIT2");
    const cbColonia = document.getElementById("cbColoniaIT2");
    const nombreAsesor = document.getElementById("nombreAsesorIT1");
    const tipoJuicioAplica = document.getElementById("tipoJuicioIT1");
    const resumenHecho = document.getElementById("resumenHechoIT1");
    const conclusion = document.getElementById("conclusionIT1");
    const recibio1 = document.getElementById("recibio1IT1");
    const recibio2 = document.getElementById("recibio2IT1");
    const recibio3 = document.getElementById("recibio3IT1");
    const confirmacionCumple = document.getElementById("confirmacionCumpleIT1");
    const negacionCumple = document.getElementById("negacionCumpleIT1");


    //Campos registro
    // Obtener las etiquetas correspondientes a las constantes
    const nombreAsesorIT32 = document.getElementById("nombreAsesorIT3");
    nombreAsesorIT32.innerHTML = nombreAsesor.options[nombreAsesor.selectedIndex].text
    const tipoJuicioAplicaLabel2 = document.getElementById("tipoJuicioIT3");
    tipoJuicioAplicaLabel2.innerHTML = tipoJuicioAplica.options[tipoJuicioAplica.selectedIndex].text;

    const resumenHechosLabel2 = document.getElementById("resumenHechosIT3");
    resumenHechosLabel2.innerHTML = resumenHecho.value;
    const conclusionLabel2 = document.getElementById("conclusionIT3");
    conclusionLabel2.innerHTML = conclusion.value;


    const recibioLabel2 = document.getElementById("recibioIT3");

    // Verificar si cada checkbox ha sido seleccionado
    if (recibio1.checked) {
        recibioLabel2.innerHTML += " Requisitos"; // Agregar el valor al contenido
    }

    if (recibio2.checked) {
        recibioLabel2.innerHTML += " Carta compromiso"; // Agregar el valor al contenido
    }

    if (recibio3.checked) {
        recibioLabel2.innerHTML += " Citatorio"; // Agregar el valor al contenido
    }
    const cumpleLabel2 = document.getElementById("cumpleIT3");

    // Aquí necesitas verificar cuál de los radios está seleccionado
    if (confirmacionCumple.checked) {
        cumpleLabel2.innerHTML = "Sí";
    } else if (negacionCumple.checked) {
        cumpleLabel2.innerHTML = "No";
    }

    const nombreAsesoradoLabel2 = document.getElementById("nombreAsesoradoIT3");
    nombreAsesoradoLabel2.innerHTML = nombreAsesorado.value + " " + apellidoPaternoAsesorado.value + " " + apellidoMaternoAsesorado.value;

    const edad2 = document.getElementById("edadIT3");
    edad2.innerHTML = edad.value;
    const sexo2 = document.getElementById("sexoIT3");
    sexo2.innerHTML = sexo.value;
    const telefonoAsesorado2 = document.getElementById("telefonoIT3");
    telefonoAsesorado2.innerHTML = telefonoAsesorado.value;

    const trabaja2 = document.getElementById("trabajaIT3");
    if (trabajaSi.checked) {
        trabaja2.innerHTML = "Si";
    }
    if (trabajaNo.checked) {
        trabaja2.innerHTML = "No";
    }
    const estadoCivil2 = document.getElementById("estadoCivilIT3");
    estadoCivil2.innerHTML = estadoCivil.value;
    const numHijos2 = document.getElementById("numHijosIT3");
    numHijos2.innerHTML = numHijos.value;
    const calle2 = document.getElementById("calleIT3");
    calle2.innerHTML = calle.value;
    const numExterior2 = document.getElementById("numExteriorIT3");
    numExterior2.innerHTML = numExterior.value;
    const numInterior2 = document.getElementById("numInteriorIT3");
    if (numInterior.value === "") {

    } else {
        numInterior2.innerHTML = numInterior.value;
    }
    const codigoPostal2 = document.getElementById("codigoPostalIT3");
    codigoPostal2.innerHTML = codigoPostal.value;
    const estado2 = document.getElementById("estadoIT3");
    estado2.innerHTML = txtEstado.value;
    const municipio2 = document.getElementById("municipioIT3");
    municipio2.innerHTML = txtMunicipio.value;
    const ciudad2 = document.getElementById("ciudadIT3");
    ciudad2.innerHTML = txtCiudad.value;
    const colonia2 = document.getElementById("coloniaIT3");
    colonia2.innerHTML = cbColonia.options[cbColonia.selectedIndex].text;

}