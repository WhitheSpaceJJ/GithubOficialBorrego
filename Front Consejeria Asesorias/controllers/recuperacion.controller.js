import { ValidationError } from '../lib/errors'

class RecuperacionController {
  constructor(model) {
    this.model = model
  }

  callbackClose = () => {
    window.location.replace('login.html')
  }

  handleRecuperacion = async () => {
    const correo = document.getElementById('correo').value
    try {
      if (!correo) {
        throw new ValidationError(
          'Campos obligatorios en blanco, por favor revise.'
        )
      }

      const response = await this.model.recover(correo)
      const modal = document.querySelector('modal-warning')
      modal.title = 'Recuperación Exitosa.'
      modal.message = response.message
      modal.open = true
      // modal.setOnCloseCallback = this.callbackClose
      // location.replace('login.html')
    } catch (error) {
      if (error instanceof ValidationError) {
        const modal = document.querySelector('modal-warning')
        modal.message = error.message
        modal.open = true
      } else {
        const modal = document.querySelector('modal-warning')
        modal.message = 'No existe usuario con el correo proporcionado.'
        modal.open = true
      }
    }
  }
}

export { RecuperacionController }
