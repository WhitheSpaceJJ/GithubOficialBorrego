import '../components/asesoria/modal-asesoria.js'
import '../components/asesoria/data-asesoria.js'

class ConsultaView {
  constructor(controller) {
    this.controller = controller
    document.addEventListener(
      'DOMContentLoaded',
      this.controller.handleDOMContentLoaded()
    )
  }
}

export { ConsultaView }
