function guardarRegistroAsesoria() {
    const asesoria = {
        'nombreAsesor': document.getElementById('nombreAsesor').value,
        'tipoJuicio': document.getElementById('TipoJuicio').value,
        'resumenHechos': document.getElementById('resumenHechosInput').value,
        'conclusion': document.getElementById('conclusionInput').value,
        'recibio': obtenerCheckBoxesSeleccionado('checkBoxRecibio'),
        'cumple': obtenerRadioButtonSeleccionado('usuarioCumple'),
        Asesorado: {
            'nombre': document.getElementById('nombrePromovente').value,
            'apellidoPaterno': document.getElementById('apellidoPaternoPromovente').value,
            'apellidoMaterno': document.getElementById('apellidoMaternoPromovente').value,
            'edad': document.getElementById('edad').value,
            //'sexo': obtenerRadioButtonSeleccionado('sexoAsesorado'),
            'sexo': document.getElementById('sexo').value,
            'telefono': document.getElementById('telefonoAsesorado').value,
            'trabaja': obtenerRadioButtonSeleccionado('trabajaRadioButton'),
            'ingreso': ingreso,
            'motivo': motivo,
            'estadoCivil': document.getElementById('edoCivil'),
            'numHijos': document.getElementById('numHijos'),
            'domicilio': {
                'calle': document.getElementById('calleDomicilioAsesorado'),
                'numExterior': document.getElementById('numExteriorAsesorado'),
                'numInterior': document.getElementById('numInteriorAsesorado')
            }
        }
    }
}

function obtenerCheckBoxesSeleccionado(name) {
    let checkBoxes = document.getElementsByName(name);
    let valoresSeleccionados = [];

    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            valoresSeleccionados.push(checkBoxes[i].value);
        }
    }
    return valoresSeleccionados;
}

function obtenerRadioButtonSeleccionado(name) {
    let radioButtons = document.getElementsByName(name);
    let valorSeleccionado = '';

    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            valorSeleccionado = radioButtons[i].value;
            break;
        }
    }
    return valorSeleccionado;
}
/*
 function registrarCaso() {
 let demanda = {
 'tipoJuicio': document.getElementById('tipojuicio').value,
 'fechaIngreso': document.getElementById('fecha').value,
 'fechaProceso': document.getElementById('fecha2').value,
 'juzgado': document.getElementById('juzgado').value,
 'numOficio': document.getElementById('numOficioFolio'),
 'pruebas': obtenerPruebas(),
 'promovente': {
 'nombre': document.getElementById('nombrePromovente').text,
 'apellidoPaterno': document.getElementById('apellidoPaternoPromovente'),
 'apellidoMaterno': document.getElementById('apellidoMaternoPromovente'),
 'edad': document.getElementById('edad').value,
 'sexo': document.getElementById('sexo').value
 }
 
 };
 
 }*/
function obtenerPruebas() {
    let form = document.getElementById('formularioPruebas');
    var checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    var selectedTexts = [];

    for (var i = 0; i < checkboxes.length; i++) {
        selectedTexts.push(checkboxes[i].parentElement.textContent.trim());
    }

    return selectedTexts;
}

function obtenerSexo() {

}

function mostrarElemento(id) {
    let elemento = document.getElementById(id);
    elemento.style.display = 'block';
}

function ocultarElemento(id) {
    let elemento = document.getElementById(id);
    elemento.style.display = 'none';
}

function verificarOpcionOtro(idComboBox, idText) {
    let combo = document.getElementById(idComboBox);
    let text = document.getElementById(idText);

    if (combo.value == 'otro') {
        text.style.visibility = 'visible';
    } else {
        text.style.visibility = 'hidden';
    }
}

/*******************************************************************************************************************/
function sexoCombo(genero) {
    var selectGenero = document.getElementById("sexo");

    genero.forEach(function (sexo) {
        var option = document.createElement("option");
        option.value = sexo.id;
        option.textContent = sexo.descripcion.trim();
        selectGenero.appendChild(option);
    });
}

fetch('/webresources/Genero/')
        .then(response => response.json())
        .then(data => {
            var sexo = data;
            sexoCombo(sexo);
        })
        .catch(error => {
            console.error('Error:', error);
        });



function estadoCivilCombo(estadoCivil) {
    var selectEstadoCivil = document.getElementById("estadoCivil");

    estadoCivil.forEach(function (eCivil) {
        var option = document.createElement("option");
        option.value = eCivil.id;
        option.text = eCivil.descripcion;
        selectEstadoCivil.add(option);
    });
}


fetch('/webresources/estado-civil')
        .then(response => response.json())
        .then(data => {
            var estadoCivil = data;
            estadoCivilCombo(estadoCivil);
        })
        .catch(error => {
            console.error('Error:', error);
        });



function motivoNoTrabaja(motivoNoTrabja) {
    var selectMotivo = document.getElementById("cbMotivo");

    motivoNoTrabja.forEach(function (noTrabaja) {
        var option = document.createElement("option");
        option.value = noTrabaja.id;
        option.text = noTrabaja.descripcion;
        selectMotivo.add(option);
    });
}

// LLENADO DE COMBO MOTIVO NO TRABAJA
fetch('/webresources/motivos')
        .then(response => response.json())
        .then(data => {
            var motivos = data;
            motivoNoTrabaja(motivos);
        })
        .catch(error => {
            console.error('Error:', error);
        });

function valiarAsesorado() {
    var camposLlenos = true;
    var regexNoNumerosCaracteres = /^[A-Za-z\s]+$/;

    var nombreInput = document.getElementById('nombrePromovente');
    var nombrePromovente = nombreInput.value.trim();

    var apellidoPaternoInput = document.getElementById('apellidoPaternoPromovente');
    var apellidoPaternoPromovente = apellidoPaternoInput.value.trim();

    var apellidoMaternoInput = document.getElementById('apellidoMaternoPromovente');
    var apellidoMaternoPromovente = apellidoMaternoInput.value.trim();

    var edadInputPromovente = document.getElementById('edad');
    var edadPromovente = parseInt(edadInputPromovente.value);

    var comboSexo = document.getElementById('sexo');
    var selectedcomboSexo = comboSexo.value;

    var telefonoInput = document.getElementById('telefonoAsesorado');
    var telefono = telefonoInput.value.trim();

    var trabajaSi = document.getElementById('trabajaSi');
    var trabajaNo = document.getElementById('trabajaNo');

    var comboEsatdoCivil = document.getElementById('estadoCivil');
    var selectedcomboEsatdoCivil = comboEsatdoCivil.value;

    var numHijos = document.getElementById('numHijos').value;

    var calleDomicilio = document.getElementById("calle");
    var calle = calleDomicilio.value.trim();

    var numExteriorDomicilio = document.getElementById("numExterior");
    var numExterior = numExteriorDomicilio.value.trim();

    var numeroInteriorDomicilio = document.getElementById("numInterior");
    var numInterior = numeroInteriorDomicilio.value.trim();

    //Entra al web component
    var codigoPostal = document.getElementById("postCodigoPostalAsesorado");

    var seleccionColonia = document.getElementById("postCodigoPostalAsesorado");

    var estadoAutomatico = document.getElementById("postCodigoPostalAsesorado");

    var otro = document.getElementById("postCodigoPostalAsesorado");


    //Validar nombre
    if (nombrePromovente === "") {
        alert("Por favor, ingrese el nombre.");
        return;
    }

    if (!regexNoNumerosCaracteres.test(nombrePromovente)) {
        alert("El nombre no debe contener números ni caracteres especiales.");
        return;
    }

    //Validar apellido paterno
    if (apellidoMaternoPromovente === "") {
        alert("Por favor, ingrese el apellido paterno.");
        return;
    }

    if (!regexNoNumerosCaracteres.test(apellidoPaternoPromovente)) {
        alert("El apellido paterno no debe contener números ni caracteres especiales.");
        return;
    }


    //Validar apellido materno
    if (apellidoMaternoPromovente === "") {
        alert("Por favor, ingrese el apellido materno.");
        return;
    }

    if (!regexNoNumerosCaracteres.test(apellidoMaternoPromovente)) {
        alert("El apellido materno no debe contener números ni caracteres especiales.");
        return;
    }

    //Validar edad
    if (edadPromovente === 0) {
        alert("Por favor, ingresa la edad.");
        return;
    }

    if (edadPromovente < 18) {
        alert("Debes ser mayor de 18 años.");
        return;
    }

    if (edadPromovente < 0) {
        alert("La edad no puede ser un número negativo.");
        return;
    }

    //Validar que haya seleccionado sexo
    if (selectedcomboSexo === "SELECCIONAR OPCION") {
        camposLlenos = false;
        alert('Por favor, seleccione el sexo');
        return false;
    }


    //Validar número de telefono
    if (telefono.length !== 10) {
        alert('El teléfono debe contener exactamente 10 dígitos');
        return false;
    }

    if (!/^[0-9]+$/.test(telefono)) {
        alert('Por favor, ingrese solo números en el teléfono');
        return false;
    }


    //Validar si una selecciono una opcion de  si trabaja o no
    if (!trabajaSi.checked && !trabajaNo.checked) {
        alert('Por favor, seleccione si trabaja o no');
        return false;
    }

    if (trabajaSi.checked) {
        var menorOption = document.getElementById('menorOption');
        var mayorOption = document.getElementById('mayorOption');

        if (!menorOption.checked && !mayorOption.checked) {
            alert('Por favor, seleccione una opción de ingreso mensual');
            return false;
        }
    }

    if (trabajaNo.checked) {
        var comboMotivo = document.getElementById('cbMotivo');
        var selectedcomboMotivo = comboMotivo.value;

        var txtMotivo = document.getElementById('txtMotivo');
        var motivo = txtMotivo.value.trim();

        if (selectedcomboMotivo === "SELECCIONAR OPCION") {
            camposLlenos = false;
            alert('Por favor, seleccione el motivo del porque no trabaja');
            return false;
        } else if (selectedcomboMotivo === "otro") {
            if (motivo === '') {
                alert('Por favor, Ingrese el motivo');
                return false;
            }
        }
    }

    //Validar estado civil
    if (selectedcomboEsatdoCivil === "SELECCIONAR OPCION") {
        camposLlenos = false;
        alert('Por favor, seleccione el esatdo civil');
        return false;
    }

    //validar hijos
    if (numHijos < 0) {
        alert("El número de hijos no puede ser un número negativo.");
        return;
    }

    //Validar calle
    /*if (calle === "") {
     alert("Por favor, ingrese la calle del domicilio.");
     return;
     }*/

    var regex = /^[A-Za-z\s]*$/;

    if (calle !== '' && !regex.test(calle)) {
        alert('Por favor, ingrese solo letras en el campo de la calle');
        return false;
    }


    //Validar seleccion de colonia AUN NO FUNCIONA
    if (seleccionColonia.selectColonia === "" || seleccionColonia.selectColonia === "SELECCIONAR COLONIA") {
        //camposLlenos = false;
        alert("Por favor, seleccione la colonia del domicilio.");
        return false;
    }

    if (otro.selectColonia === "Otro.." && otro.txtOtro === "") {

        alert("Por favor, ingrese la colonia");
        return;


    }


    if (camposLlenos) {
        window.location.href = "#tab2";
    }
    /*
     var registrosAsesorias = [];
     
     // GUARDADO DE LOS DATOS DEL DEMANDADO¿
     function guardarRegistroAsesoria() {
     var codigoPostal = document.getElementById("codigoPostalDemandado");
     
     var seleccionSexoHombre = document.getElementById("contactChoice1").checked;
     var seleccionSexoMujer = document.getElementById("contactChoice2").checked;
     var seleccionSexoBinario = document.getElementById("contactChoice3").checked;
     
     var trabajaSi = document.getElementById("trabajaSi").checked;
     var trabajaNo = document.getElementById("trabajaNo").checked;
     
     var ingresoMayor = document.getElementById("mayorOption").checked;
     var ingresoMenor = document.getElementById("menorOption").checked;
     
     var ingresoEdad = document.getElementById('edad').value;
     
     var numeroHijos = document.getElementById("numHijos").value;
     
     var codigoPostal =document.getElementById("postCodigoPostalAsesorado");
     
     var nuevaAsesoria = {
     nombre: nombrePromovente,
     apellido_Paterno: apellidoPaternoPromovente,
     apellido_Materno: apellidoMaternoPromovente,
     edad: ingresoEdad,
     sexo: selectedcomboSexo,
     telefono: telefono,
     trabaja: [trabajaSi, trabajaNo],
     ingreso: [ingresoMenor, ingresoMayor],
     motivo: selectedcomboMotivo,
     textoMotivo: motivo,
     estado_Civil: selectedcomboEsatdoCivil,
     numero_hijos: numeroHijos,
     calle: calle,
     num_exterior: numExterior,
     num_interior: numInterior,
     codigo_Postal: codigoPostal.txtCodigoPostal,
     estado: codigoPostal.estado,
     municipio: codigoPostal.municipio,
     ciudad: codigoPostal.ciudad,
     colonia: codigoPostal.selectColonia,
     otra_colonia: codigoPostal.txtOtro,
     
     };
     
     
     
     registrosAsesorias.push(nuevaAsesoria);
     
     // almacenamiento local
     localStorage.setItem('registrosAsesorias', JSON.stringify(registrosAsesorias));
     }
     //cargar los registros de demanda almacenados
     function cargarRegistrosAsesorias() {
     var registrosGuardados = localStorage.getItem('registrosAsesorias');
     if (registrosGuardados) {
     registrosAsesorias = JSON.parse(registrosGuardados);
     }
     }
     
     
     cargarRegistrosAsesorias();
     guardarRegistroAsesoria();
     
     console.log(registrosAsesorias);
     
     alert("¡El registro se realizó exitosamente!");*/

}

/*******************************************************************************************************************/

function nombreAsesorador(asesorador) {
    var selectNomAsesorador = document.getElementById("nombreAsesor");

    asesorador.forEach(function (nombreAse) {
        var option = document.createElement("option");
        option.value = nombreAse.id;
        option.textContent = nombreAse.nombre;
        selectNomAsesorador.appendChild(option);
    });
}

// LLENADO DE COMBO NOMBRE ASESORADOR
fetch('/webresources/Asesor/')
        .then(response => response.json())
        .then(data => {
            var asesorador = data;
            nombreAsesorador(asesorador);
        })
        .catch(error => {
            console.error('Error:', error);
        });


function demandaTipoJuicio(tiposJuicios) {
    var selectTipoJuicio = document.getElementById("TipoJuicio");

    tiposJuicios.forEach(function (tipoJuicio) {
        var option = document.createElement("option");
        option.value = tipoJuicio.id;
        option.textContent = tipoJuicio.descripcion;
        selectTipoJuicio.appendChild(option);
    });
}

// LLENADO DE COMBO DE TIPO DE JUICIO
fetch('/webresources/TipoJuicio/')
        .then(response => response.json())
        .then(data => {
            var tiposJuicios = data;
            demandaTipoJuicio(tiposJuicios);
        })
        .catch(error => {
            console.error('Error:', error);
        });

function validaionesAsesoria() {

    var camposLlenos = true;

    var comboNombreAsesorador = document.getElementById('nombreAsesor');
    var selectedcomboNombreAsesorador = comboNombreAsesorador.value;

    var comboTipoJuicio = document.getElementById('TipoJuicio');
    var selectedcomboTipoJucio = comboTipoJuicio.value;

    var resumenHechosInput = document.getElementById("resumenHechosInput");
    var resumenHechos = resumenHechosInput.value.trim();

    var conclusionInput = document.getElementById("conclusionInput");
    var conclusion = conclusionInput.value.trim();

    var checkboxesRecibio = document.querySelectorAll('.recibio input[type="checkbox"]');
    var seleccionadoRecibio = false;

    var radiosCumple = document.getElementsByName('confirm');
    var seleccionadoCumple = false;

    //Validar asesorador
    if (selectedcomboNombreAsesorador === "SELECCIONAR OPCION") {
        camposLlenos = false;
        alert('Por favor, seleccione el nombre del asesorador');
        return false;
    }

    //Validar Tipo juicio
    if (selectedcomboTipoJucio === "SELECCIONAR OPCION") {
        camposLlenos = false;
        alert('Por favor, seleccione el tipo de juicio');
        return false;
    }

    //Validar resumen de los hechos
    if (resumenHechos === "") {
        alert("Por favor, ingrese el resumen de los hechos.");
        return;
    }

    //Validar resumen
    if (conclusion === "") {
        alert("Por favor, ingrese la conclusión.");
        return;
    }

    //validar seleccion de asesorado 
    for (var i = 0; i < checkboxesRecibio.length; i++) {
        if (checkboxesRecibio[i].checked) {
            seleccionadoRecibio = true;
            break;
        }
    }
    if (!seleccionadoRecibio) {
        alert("Debe seleccionar al menos una opción de asesorado que recibió.");
        return;
    }

    //Si cumple
    for (var i = 0; i < radiosCumple.length; i++) {
        if (radiosCumple[i].checked) {
            seleccionadoCumple = true;
            break;
        }
    }
    if (!seleccionadoCumple) {
        alert("Debe seleccionar una opción de que si cumple con los requisitos.");
        return;
    }

    if (camposLlenos) {
        registrarAsesoria();
    }

    // almacenar los registros de demanda
    /*
     var registrosAsesorias = [];
     
     registrosAsesorias.push(nuevaAsesoria);
     
     // almacenamiento local
     localStorage.setItem('registrosAsesorias', JSON.stringify(registrosAsesorias));
     }
     //cargar los registros de demanda almacenados
     function cargarRegistrosAsesorias() {
     var registrosGuardados = localStorage.getItem('registrosAsesorias');
     if (registrosGuardados) {
     registrosAsesorias = JSON.parse(registrosGuardados);
     }
     }
     
     
     cargarRegistrosAsesorias();
     guardarRegistroAsesoria();
     
     console.log(registrosAsesorias);
     
     alert("¡El registro se realizó exitosamente!");*/
}

function registrarAsesoria() {
//Obtener los valores de los campos
    let ingreso, motivo;
    if (obtenerRadioButtonSeleccionado('trabajaRadioButton') === 'si') {
        motivo = 'Sí trabaja';
        ingreso = obtenerRadioButtonSeleccionado('ingresoRadioButton');
    } else if (obtenerRadioButtonSeleccionado('trabajaRadioButton') === 'no') {
        motivo = document.getElementById('cbMotivo').value;
        ingreso = 'No trabaja';
    }

//Obtener el webComponent
    const codigoPostalComponente = document.getElementById('postCodigoPostalAsesorado');
  //  const shadowRoot = codigoPostalComponente.shadowRoot;
    //const elementos = shadowRoot.querySelectorAll('.mi-elemento');
    //Ingresarlos en el JSON
    const asesoria = {
        Asesor: {
            'nombre': document.getElementById('nombreAsesor').value
        },
        'tipoJuicio': document.getElementById('TipoJuicio').value,
        'resumen': document.getElementById('resumenHechosInput').value,
        'conclusion': document.getElementById('conclusionInput').value,
        Recibio: {
            'descripcion': obtenerCheckBoxesSeleccionado('checkBoxRecibio')
        },
        'cumpleRequisitos': obtenerRadioButtonSeleccionado('usuarioCumple'),
        Asesorado: {
            'nombre': document.getElementById('nombrePromovente').value,
            'apellidoPaterno': document.getElementById('apellidoPaternoPromovente').value,
            'apellidoMaterno': document.getElementById('apellidoMaternoPromovente').value,
            'edad': document.getElementById('edad').value,
            'sexo': obtenerRadioButtonSeleccionado('sexoAsesorado'),
            'telefono': document.getElementById('telefonoAsesorado').value,
            'trabaja': obtenerRadioButtonSeleccionado('trabajaRadioButton'),
            'ingreso': ingreso,
            'motivo': motivo,
            'estadoCivil': document.getElementById('edoCivil'),
            'numHijos': document.getElementById('numHijos'),
            Domicilio: {
                'calle': document.getElementById('calleDomicilioAsesorado'),
                'numExterior': document.getElementById('numExteriorAsesorado'),
                'numInterior': document.getElementById('numInteriorAsesorado'),
                CodigoPostal: {
                    'codigo' : codigoPostalComponente.txtCodigoPostal,
                    'colonia': codigoPostalComponente.selectColonia,
                }
            }
        }
    }

//Funcion fetch
    fetch('/webresources/Asesorias/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(asesoria)
    })
            .then(response => {
                // Aquí puedes manejar la respuesta del servidor
                if (response.ok) {
                    alert('Se registro la asesoria');
                } else {
                    throw new Error('Error en la solicitud');
                }
            })
            .catch(error => {
                alert('Error: ', error);
            });
}