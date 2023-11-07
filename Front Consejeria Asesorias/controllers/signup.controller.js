import { validateNonEmptyFields } from '../lib/utils'
import { ValidationError } from '../lib/errors'
import { ControllerUtils } from '../lib/controllerUtils'

class SignUpController {
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
  }

  // Methods
  handleDOMContentLoaded = () => {
    this.utils.validatePermissions({})
  }

  handleSignup = async () => {
    const nombre = document.getElementById('nombre').value
    const apellidoPaterno = document.getElementById('apellido-paterno').value
    const apellidoMaterno = document.getElementById('apellido-materno').value
    const correo = document.getElementById('correo').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('password-confirm').value
    const zona = document.getElementById('zona').value
    const rol = document.getElementById('rol-usuario').value

    try {
      const requiredFields = [
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        correo,
        password,
        passwordConfirm,
      ]

      if (!validateNonEmptyFields(requiredFields) || zona === '0' || rol === '0') {
        throw new ValidationError(
          'Campos obligatorios en blanco, por favor revise.'
        )
      }

      if (password !== passwordConfirm) {
        throw new ValidationError('Las contraseñas no coinciden.')
      }

      const user = {
        nombre,
        paterno: apellidoPaterno,
        materno: apellidoMaterno,
        correo,
        password,
        id_tipouser: rol,
        id_zona: zona,
      }
      await this.model.signUp(user)
      location.replace('login.html')
    } catch (error) {
      if (error instanceof ValidationError) {
        const modal = document.querySelector('modal-warning')
        modal.message = error.message
        modal.open = true
      } else {
        const modal = document.querySelector('modal-warning')
        modal.message =
          'Error al registrar usuario, por favor intenta de nuevo.'
        modal.open = true
      }
    }
  }
}

export { SignUpController }
