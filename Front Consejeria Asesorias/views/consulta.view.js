import '../components/asesoria/modal-asesoria.js'
import '../components/asesoria/data-asesoria.js'
import '../components/navbar/navbar.js'

class ConsultaView {
  constructor(controller) {
    this.controller = controller
    this.filtrosForm = document.getElementById('filtros-form')

    this.filtrosForm.addEventListener('submit', e => {
      e.preventDefault()
      this.controller.handleFiltros()
    })

    document.addEventListener(
      'DOMContentLoaded',
      this.controller.handleDOMContentLoaded(),
      this.controller.handleCheckboxChange(),
      this.controller.handleSelectChange()
    )
  }
}

export { ConsultaView }
