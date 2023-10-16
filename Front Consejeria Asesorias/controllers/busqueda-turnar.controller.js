import { ControllerUtils } from '../lib/controllerUtils.js'
import { ValidationError } from '../lib/errors.js'
import { validateNonEmptyFields } from '../lib/utils.js'

class BusquedaTurnar {
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
  }

  // DOMContentLoaded
  handleDOMContentLoaded = () => {
    // add permissions
    this.utils.validatePermissions({})
  }

  // Methods
  handleSearch = async inputs => {
    const [nombre, apellidoPaterno, apellidoMaterno] = inputs
    console.log(nombre, apellidoPaterno, apellidoMaterno)
    try {
      if (!validateNonEmptyFields(inputs)) {
        throw new ValidationError(
          'Campos obligatorios en blanco, por favor revise.'
        )
      }

      const { asesoria } = await this.model.getAsesoriaByFullName({
        nombre,
        apellidoPaterno,
        apellidoMaterno,
      })
      console.log(asesoria)
      console.log(asesoria.persona.domicilio.id_colonia)

      const dataColonia = await this.model.getColoniaById(
        asesoria.persona.domicilio.id_colonia
      )
      console.log(dataColonia)

      sessionStorage.setItem('asesoria', JSON.stringify(asesoria))
      sessionStorage.setItem('colonia', JSON.stringify(dataColonia))

      location.href = 'turnar.html'
    } catch (error) {
      if (error instanceof ValidationError) {
        const modal = document.querySelector('modal-warning')
        modal.message = error.message
        modal.open = true
      } else {
        const modal = document.querySelector('modal-warning')
        modal.message = 'Error al buscar, por favor intenta de nuevo'
        modal.open = true
      }
    }
  }
}

export { BusquedaTurnar }
