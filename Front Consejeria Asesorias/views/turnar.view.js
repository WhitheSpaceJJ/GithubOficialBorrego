import '../components/modal-warning/modal-warning.js'
import '../components/navbar/navbar.js'
import '../components/turnar/tabs-header.js'
import '../components/turnar/asesorado-tab.js'
import '../components/turnar/domicilio-tab.js'
import '../components/turnar/turno-tab.js'

class TurnarView {
  constructor(controller) {
    this.controller = controller

    // Agrega manejadores de eventos
    document.addEventListener(
      'DOMContentLoaded',
      this.controller.handleDOMContentLoaded()
    )
  }
}

export { TurnarView }
