import { ControllerUtils } from '../lib/controllerUtils'
import { DataAsesoria } from '../components/asesoria/data-asesoria'

class ConsultaController {
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
    this.CheckEventListeners()
    this.ComboBoxEventListeners()
  }

  // DOMContentLoaded
  handleDOMContentLoaded = () => {
    // add permissions
    this.utils.validatePermissions({})
    this.handleConsultarAsesorias()
    this.agregarMunicipios()
    this.agregarZonas()
    window.handleConsultarAsesoriasById = this.handleConsultarAsesoriasById
  }

  CheckEventListeners = () => {
    const checkboxAsesor = document.getElementById('check-asesor')
    const checkboxMunicipio = document.getElementById('check-municipio')
    const checkboxZona = document.getElementById('check-zona')
    const checkboxDefensor = document.getElementById('check-defensor')

    checkboxAsesor.addEventListener('change', this.handleCheckboxChange)
    checkboxMunicipio.addEventListener('change', this.handleCheckboxChange)
    checkboxZona.addEventListener('change', this.handleCheckboxChange)
    checkboxDefensor.addEventListener('change', this.handleCheckboxChange)
  }

  ComboBoxEventListeners = () => {
    const selectAsesor = document.getElementById('select-asesor')
    const selectMunicipio = document.getElementById('select-municipio')
    const selectZona = document.getElementById('select-zona')
    const selectDefensor = document.getElementById('select-defensor')

    selectAsesor.addEventListener('change', this.handleSelectChange)
    selectMunicipio.addEventListener('change', this.handleSelectChange)
    selectZona.addEventListener('change', this.handleSelectChange)
    selectDefensor.addEventListener('change', this.handleSelectChange)
  }

  handleSelectChange = () => {
    const selectAsesor = document.getElementById('select-asesor')
    const selectZona = document.getElementById('select-zona')
    const selectDefensor = document.getElementById('select-defensor')

    const checkboxDefensor = document.getElementById('check-defensor')
    const checkboxAsesor = document.getElementById('check-asesor')
    const zona = selectZona.value

    // const table = document.getElementById('table-body')
    // table.innerHTML = ''

    if (zona !== '0') {
      // Habilitar checkbox y select de defensor
      this.agregarDefensores()
      this.agregarAsesores()
      checkboxDefensor.disabled = false
      if (checkboxDefensor.checked) {
        selectDefensor.disabled = false
      } else {
        selectDefensor.disabled = true
        selectDefensor.value = 0
      }
      checkboxAsesor.disabled = false
      if (checkboxAsesor.checked) {
        selectAsesor.disabled = false
      } else {
        selectAsesor.disabled = true
        selectAsesor.value = 0
      }
    } else {
      // Si la zona es 0, deshabilitar el checkbox y el select de defensor
      checkboxDefensor.disabled = true
      selectDefensor.value = 0
    }
  }

  handleCheckboxChange = () => {
    const checkboxAsesor = document.getElementById('check-asesor')
    const selectAsesor = document.getElementById('select-asesor')
    const checkboxMunicipio = document.getElementById('check-municipio')
    const selectMunicipio = document.getElementById('select-municipio')
    const checkboxZona = document.getElementById('check-zona')
    const selectZona = document.getElementById('select-zona')
    const checkboxDefensor = document.getElementById('check-defensor')
    const selectDefensor = document.getElementById('select-defensor')

    if (checkboxMunicipio.checked) {
      selectMunicipio.disabled = false
    } else {
      selectMunicipio.disabled = true
      selectMunicipio.value = 0
    }

    if (checkboxZona.checked) {
      selectZona.disabled = false
    } else {
      selectZona.disabled = true
      selectZona.value = 0
      selectDefensor.disabled = true
      selectDefensor.value = 0
      selectAsesor.disabled = true
      selectAsesor.value = 0
      checkboxDefensor.checked = false
    }

    if (selectZona.value !== '0') {
      checkboxDefensor.disabled = false
      if (checkboxDefensor.checked) {
        selectDefensor.disabled = false
      } else {
        selectDefensor.disabled = true
        selectDefensor.value = 0
      }
      checkboxAsesor.disabled = false
      if (checkboxAsesor.checked) {
        selectAsesor.disabled = false
      } else {
        selectAsesor.disabled = true
        selectAsesor.value = 0
      }
    }
  }

  handleConsultarAsesorias = async () => {
    try {
      const asesoriasResponse = await this.model.getAsesorias()
      const asesorias = asesoriasResponse.asesorias

      const table = document.getElementById('table-body')
      asesorias.forEach(asesoria => {
        table.appendChild(this.crearRow(asesoria))
      })
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  handleConsultarAsesoriasById = async id => {
    try {
      const button = document.querySelector('.consulta-button')
      button.disabled = true
      const asesoria = await this.model.getAsesoriaById(id)
      const persona = asesoria.asesoria.persona
      const domicilio = await this.model.getColoniaById(
        persona.domicilio.id_colonia
      )
      const modal = document.querySelector('modal-asesoria')
      const dataAsesoria = new DataAsesoria(asesoria, domicilio)

      const handleModalClose = () => {
        const modalContent = modal.shadowRoot.getElementById('modal-content')
        modalContent.innerHTML = ''
        button.disabled = false
      }

      modal.addEventListener('onClose', handleModalClose)

      const modalContent = modal.shadowRoot.getElementById('modal-content')
      modalContent.appendChild(dataAsesoria)

      modal.title = 'Datos Asesoría'
      modal.open = true
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  handleFiltros = async () => {
    const checkboxAsesor = document.getElementById('check-asesor')
    const checkboxMunicipio = document.getElementById('check-municipio')
    const checkboxZona = document.getElementById('check-zona')
    const checkboxDefensor = document.getElementById('check-defensor')

    const selectAsesor = document.getElementById('select-asesor')
    const selectMunicipio = document.getElementById('select-municipio')
    const selectZona = document.getElementById('select-zona')
    const selectDefensor = document.getElementById('select-defensor')

    const fechaInicio = document.getElementById('fecha-inicio')
    const fechaFinal = document.getElementById('fecha-final')

    const table = document.getElementById('table-body')
    table.innerHTML = ''
    const filtros = {
      fecha_inicio: fechaInicio.value,
      fecha_final: fechaFinal.value,
      id_municipio: checkboxMunicipio.checked ? selectMunicipio.value : null,
      id_zona: checkboxZona.checked ? selectZona.value : null,
      id_asesor: checkboxAsesor.checked ? selectAsesor.value : null,
      id_defensor: checkboxDefensor.checked ? selectDefensor.value : null,
    }
    try {
      const asesoriasResponse = await this.model.getAsesoriasByFilters(filtros)
      console.log(asesoriasResponse)
      asesoriasResponse.forEach(asesoria => {
        table.appendChild(this.crearRow(asesoria))
      })
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  crearRow = asesoria => {
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
                <button href="#" class="consulta-button font-medium text-[#db2424] hover:underline" onclick="handleConsultarAsesoriasById(this.value)" value="${asesoria.datos_asesoria.id_asesoria}">Consultar</button>
            </td>`

    return row
  }

  agregarMunicipios = async () => {
    const municipios = await this.model.getMunicipios()
    const select = document.getElementById('select-municipio')
    municipios.forEach(municipio => {
      const option = document.createElement('option')
      option.value = municipio.id_municipio
      option.text = municipio.nombre_municipio
      select.appendChild(option)
    })
  }

  agregarZonas = async () => {
    const select = document.getElementById('select-zona')
    const zonas = await this.model.getZonas()
    zonas.forEach(zona => {
      const option = document.createElement('option')
      option.value = zona.id_zona
      option.text = zona.nombre_zona
      select.appendChild(option)
    })
  }

  agregarDefensores = async () => {
    const select = document.getElementById('select-defensor')
    const id_zona = document.getElementById('select-zona').value
    console.log(id_zona)
    try {
      const defensores = await this.model.getDefensoresByZona(id_zona)
      defensores.forEach(defensor => {
        const option = document.createElement('option')
        option.value = defensor.id_defensor
        option.text = defensor.nombre_defensor
        select.appendChild(option)
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  agregarAsesores = async () => {
    const select = document.getElementById('select-asesor')
    const id_zona = document.getElementById('select-zona').value
    try {
      const asesores = await this.model.getAsesoresByZona(id_zona)
      asesores.forEach(asesor => {
        const option = document.createElement('option')
        option.value = asesor.id_asesor
        option.text = asesor.nombre_asesor
        select.appendChild(option)
      })
    } catch (error) {
      console.error(error.message)
    }
  }
}
export { ConsultaController }
