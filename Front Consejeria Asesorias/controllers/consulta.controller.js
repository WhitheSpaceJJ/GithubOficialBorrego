import { ControllerUtils } from '../lib/controllerUtils'

class ConsultaController {
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
  }

  // DOMContentLoaded
  handleDOMContentLoaded = () => {
    // add permissions
    this.utils.validatePermissions({})
    this.handleConsultarAsesorias()
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
      const asesoria = await this.model.getAsesoriaById(id)
      return asesoria
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  crearRow(asesoria) {
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
}

export { ConsultaController }
