// Función para obtener los parámetros de la URL
function obtenerParametrosURL() {
  const urlParams = new URLSearchParams(window.location.search)
  const data = urlParams.get('data')
  return data
}

// Función para decodificar y analizar el JSON
function analizarDatosJSON(data) {
  if (data) {
    try {
      const decodedData = decodeURIComponent(data)
      const jsonData = JSON.parse(decodedData)
      return jsonData
    } catch (error) {
      console.error('Error al analizar los datos JSON:', error)
    }
  }
  return null
}

// Declarar una variable global para almacenar los datos
let datosAnalizadosGlobal = null

// Función para redirigir a la página de inicio de sesión si no hay datos
function redirigirSiNoHayDatos() {
  const data = obtenerParametrosURL()
  const datosAnalizados = analizarDatosJSON(data)
  if (!datosAnalizados) {
    window.location.href = 'login.html'
  } else {
    // Analizar Token
    const usuario = document.getElementById('user-name')
    const nombreCompleto = datosAnalizados.name
    const palabras = nombreCompleto.split(' ')
    const primerNombre = palabras[0]

    usuario.innerHTML = primerNombre

    // Almacenar los datos en la variable global
    datosAnalizadosGlobal = datosAnalizados
    rellenarTabla()
    // Eliminar los parámetros de la URL
    if (history.replaceState) {
      const nuevaURL = window.location.pathname // Obtener la ruta de la página actual
      history.replaceState({}, document.title, nuevaURL)
    }
  }
}

function turnar() {
  const dataString = JSON.stringify(datosAnalizadosGlobal)
  const encodedData = encodeURIComponent(dataString)
  window.location.href = `busqueda-turnar.html?data=${encodedData}`
}

function asesoria() {
  const dataString = JSON.stringify(datosAnalizadosGlobal)
  const encodedData = encodeURIComponent(dataString)
  window.location.href = `asesoria.html?data=${encodedData}`
}

// Llamar a la función de redirección al cargar la página
//window.addEventListener('load', redirigirSiNoHayDatos);

function rellenarTabla() {
  // Fetch data from the API
  const apiUrl = 'http://localhost:3000/asesorias'
  const opciones = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${datosAnalizadosGlobal.token}`,
    },
  }

  // Fetch data and populate the table
  fetch(apiUrl, opciones)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`)
      }
      return response.json()
    })
    .then(data => {
      const asesorias = data.asesorias // Access the 'asesorias' array

      const tableBody = document.getElementById('table-body')

      asesorias.forEach(asesoria => {
        const row = crearRow(asesoria)
        tableBody.appendChild(row)
      })
    })
    .catch(error => {
      console.error('Error:', error.message)
    })
}

function crearRow(asesoria) {
  const row = document.createElement('tr')
  row.classList.add('bg-white', 'border-b', 'hover:bg-gray-50')

  row.innerHTML = `<td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            ${asesoria.datos_asesoria.id_asesoria}
        </td>
        <td class="px-6 py-4">
            ${asesoria.persona.nombre} ${asesoria.persona.apellido_paterno} ${asesoria.persona.apellido_materno}
        </td>
        <td class="px-6 py-4">
            ${asesoria.tipos_juicio.tipo_juicio}
        </td>
        <td class="px-6 py-4">
            ${asesoria.datos_asesoria.resumen_asesoria}
        </td>
        <td class="px-6 py-4">
            ${asesoria.datos_asesoria.usuario}
        </td>
        <td class="px-6 py-4 text-right">
            <button href="#" class="font-medium text-[#db2424] hover:underline" onclick="consultarAsesoria(this.value)" value="${asesoria.datos_asesoria.id_asesoria}">Consultar</button>
        </td>`

  return row
}

function consultarAsesoria(asesoriaId) {}
function menu() {
  const dataString = JSON.stringify(datosAnalizadosGlobal)
  const encodedData = encodeURIComponent(dataString)
  window.location.href = `menu.html?data=${encodedData}`
}
function turnar() {
  const dataString = JSON.stringify(datosAnalizadosGlobal)
  const encodedData = encodeURIComponent(dataString)
  window.location.href = `busqueda-turnar.html?data=${encodedData}`
}
function salir() {
  window.location.href = `login.html?`
}
function consultar() {
  const dataString = JSON.stringify(datosAnalizadosGlobal)
  const encodedData = encodeURIComponent(dataString)
  window.location.href = `consulta.html?data=${encodedData}`
}
function asesoria() {
  const dataString = JSON.stringify(datosAnalizadosGlobal)
  const encodedData = encodeURIComponent(dataString)
  window.location.href = `asesoria.html?data=${encodedData}`
}

function cerrar() {
  const miAlerta = document.getElementById('miAlerta')
  miAlerta.style.display = 'none'
}

/* <tr class="bg-white border-b hover:bg-gray-50 ">
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            ${asesoria.datos_asesoria.id_asesoria}
                        </td>
                        <td class="px-6 py-4">
                            ${asesoria.persona.nombre} ${asesoria.persona.apellido_paterno} ${asesoria.persona.apellido_materno}
                        </td>
                        <td class="px-6 py-4">
                            ${asesoria.tipos_juicio.tipo_juicio}
                        </td>
                        <td class="px-6 py-4">
                            ${asesoria.datos_asesoria.resumen_asesoria}
                        </td>
                        <td class="px-6 py-4">
                            ${asesoria.datos_asesoria.usuario}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <button href="#" class="font-medium text-[#db2424] hover:underline" onclick="consultarAsesoria(this.value)" value="${asesoria.datos_asesoria.id_asesoria}">Consultar</button>
                        </td>
                    </tr>*/
