import { ValidationError } from '../lib/errors.js'
import { validateNonEmptyFields } from '../lib/utils.js'

class BusquedaTurnar {
  constructor(model) {
    this.model = model
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
