import { DataAsesoria } from '../components/asesoria/data-asesoria'
import { ControllerUtils } from '../lib/controllerUtils'

class AsesoriasTurnarController {
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
  }

  handleDOMContentLoaded = () => {
    this.utils.validatePermissions({})
    this.handleAgregarAsesorias()
    window.handleConsultarAsesoriasById = this.handleConsultarAsesoriasById
    window.handleTurnarAsesoriasById = this.handleTurnarAsesoriasById
  }

  handleAgregarAsesorias = async () => {
    const table = document.getElementById('table-body')
    const asesorias = JSON.parse(sessionStorage.getItem('asesorias'))
    asesorias.forEach(asesoria => {
      if (asesoria === null) return
      table.appendChild(this.crearRow(asesoria))
    })
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

  handleTurnarAsesoriasById = async id => {
    try {
      const asesorias = JSON.parse(sessionStorage.getItem('asesorias'))
      const asesoria = asesorias.find(asesoria => {
        if (asesoria === null) return false
        return asesoria.datos_asesoria.id_asesoria === Number(id)
      })
      const dataColonia = await this.model.getColoniaById(
        asesoria.persona.domicilio.id_colonia
      )

      sessionStorage.setItem('asesoria', JSON.stringify(asesoria))
      sessionStorage.setItem('colonia', JSON.stringify(dataColonia.colonia))

      location.href = 'turnar.html'
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
            </td>
            <td class="px-6 py-4 text-right">
                <button href="#" class="turnar-button font-medium text-[#db2424] hover:underline" onclick="handleTurnarAsesoriasById(this.value)" value="${asesoria.datos_asesoria.id_asesoria}">Turnar</button>
            </td>`

    return row
  }
}

export { AsesoriasTurnarController }
