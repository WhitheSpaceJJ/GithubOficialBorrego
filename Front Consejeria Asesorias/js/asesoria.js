
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

function validacionAsesoria() {
    const validacionAsesoria = validarCamposAsesoria();
    if (validacionAsesoria === false) {
        const miAlerta = document.getElementById("miAlerta");
        miAlerta.style.display = "block";
        const mensajeModal = document.getElementById("mensajeModal");
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
    const nombreAsesorado = document.getElementById("nombreAsesoradoIT2").value;
    const apellidoPaternoAsesorado = document.getElementById("apellidoPaternoAsesoradoIT2").value;
    const apellidoMaternoAsesorado = document.getElementById("apellidoMaternoAsesoradoIT2").value;
    const edad = document.getElementById("edadIT2").value;
    const sexo = document.getElementById("sexoIT2").value;
    const telefonoAsesorado = document.getElementById("telefonoAsesoradoIT2").value;
    const trabajaSi = document.getElementById("trabajaSiIT2").checked;
    const trabajaNo = document.getElementById("trabajaNoIT2").checked;
    const ingresoMenor = document.getElementById("menorOptionIT2").value;
    const ingresoMayor = document.getElementById("mayorOptionIT2").value;
    const motivoNoTrabajo = document.getElementById("motivoIT2").value;
    const estadoCivil = document.getElementById("estadoCivilIT2").value;
    const numHijos = document.getElementById("numHijosIT2").value;
    const calle = document.getElementById("calleIT2").value;
    const numExterior = document.getElementById("numExteriorIT2").value;
    const numInterior = document.getElementById("numInteriorIT2").value;
    const codigoPostal = document.getElementById("codigoPostalIT2").value;
    const txtEstado = document.getElementById("txtEstadoIT2").value;
    const txtMunicipio = document.getElementById("txtMunicipioIT2").value;
    const txtCiudad = document.getElementById("txtCiudadIT2").value;
    const cbColonia = document.getElementById("cbColoniaIT2").value;
    const nombreAsesor = document.getElementById("nombreAsesorIT1").value;
    const tipoJuicioAplica = document.getElementById("tipoJuicioIT1").value;
    const resumenHecho = document.getElementById("resumenHechoIT1").value;
    const conclusion = document.getElementById("conclusionIT1").value;
    const recibio1 = document.getElementById("recibio1IT1").checked;
    const recibio2 = document.getElementById("recibio2IT1").checked;
    const recibio3 = document.getElementById("recibio3IT1").checked;
    const confirmacionCumple = document.getElementById("confirmacionCumpleIT1").checked;
    const negacionCumple = document.getElementById("negacionCumpleIT1").checked;

    // Construir el objeto JSON basado en las constantes
    const data = {
        "asesorado": {
            "estatus_trabajo": trabajaSi,
            "numero_hijos": numHijos.value,
            "ingreso_mensual": ingresoMayor,
            "motivo": {
                "id_motivo": motivoNoTrabajo.value,
                "descripcion_motivo":  motivoNoTrabajo.options[motivoNoTrabajo.selectedIndex].text
            },
            "estado_civil": {
                "id_estado_civil": 1,
                "estado_civil": estadoCivil
            }
        },
        "asesor": {
            "id_asesor": 1,
            "nombre_asesor": nombreAsesor
        },
        "turno": null,
        "recibidos": [
            {
                "id_catalogo": 1,
                "descripcion_catalogo": recibio1 ? "Requisitos" : ""
            },
            {
                "id_catalogo": 2,
                "descripcion_catalogo": recibio2 ? "Carta compromiso" : ""
            },
            {
                "id_catalogo": 3,
                "descripcion_catalogo": recibio3 ? "Citatorio" : ""
            }
        ],
        "datos_asesoria": {
            "resumen_asesoria": resumenHecho.value,
            "conclusion_asesoria": conclusion.vaue,
            "estatus_requisitos": false,
            "fecha_registro": "2002-10-10",
            "usuario": "Juan"
        },
        "persona": {
            "nombre": nombreAsesorado.value,
            "apellido_materno": apellidoMaternoAsesorado.value,
            "apellido_paterno": apellidoPaternoAsesorado.value,
            "edad": edad.value,
            "telefono": telefonoAsesorado.value,
            "domicilio": {
                "calle_domicilio": calle.value,
                "numero_exterior_domicilio": numExterior.value,
                "numero_interior_domicilio": numInterior,
                "id_colonia": cbColonia.value
            },
            "genero": {
                "id_genero":sexo.value ,
                "descripcion_genero": sexo.options[sexo.selectedIndex].text
            }
        }
    };

    // Convertir el objeto JSON a una cadena y mostrarlo en un alert
    const jsonData = JSON.stringify(data, null, 2);
    alert(jsonData);
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