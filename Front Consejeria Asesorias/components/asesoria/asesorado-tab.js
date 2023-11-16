import { ValidationError } from '../../lib/errors.js'
import { validateNonEmptyFields } from '../../lib/utils.js'
import { APIModel } from '../../models/api.model'
import '../codigo-postal/codigo-postal.js'

const template = document.createElement('template')

const html = await (
  await fetch('./components/asesoria/asesorado-tab.html')
).text()
template.innerHTML = html

export class AsesoradoTab extends HTMLElement {
  #api
  #generos
  #motivos
  #estadosCiviles

  #nombre
  #apellidoPaterno
  #apellidoMaterno
  #edad
  #sexo
  #telefono
  #estatusTrabajo
  #ingreso
  #motivo
  #estadoCivil
  #numeroHijos
  #domicilio

  static get observedAttributes() {
    return ['id', 'data']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    this.id = 'asesorado'

    this.init()
  }

  async init() {
    this.#api = new APIModel()

    const { generos } = await this.#api.getGeneros()
    this.#generos = generos

    const { motivos } = await this.#api.getMotivos()
    this.#motivos = motivos

    const { estadosCiviles } = await this.#api.getEstadosCiviles()
    this.#estadosCiviles = estadosCiviles

    this.manageFormFields()
    this.fillInputs()
  }

  manageFormFields() {
    this.#nombre = this.shadowRoot.getElementById('nombre')
    this.#apellidoPaterno = this.shadowRoot.getElementById('apellido-paterno')
    this.#apellidoMaterno = this.shadowRoot.getElementById('apellido-materno')
    this.#edad = this.shadowRoot.getElementById('edad')
    this.#sexo = this.shadowRoot.getElementById('sexo')
    this.#telefono = this.shadowRoot.getElementById('telefono')
    this.#motivo = this.shadowRoot.getElementById('motivo')
    this.#estadoCivil = this.shadowRoot.getElementById('estado-civil')
    this.#numeroHijos = this.shadowRoot.getElementById('numero-hijos')
    this.#domicilio = this.shadowRoot.querySelector('cp-comp')
  }

  fillInputs() {
    this.#generos.forEach(genero => {
      const option = document.createElement('option')
      option.value = genero.id_genero
      option.text = genero.descripcion_genero
      this.#sexo.appendChild(option)
    })

    this.#motivos.forEach(motivo => {
      const option = document.createElement('option')
      option.value = motivo.id_motivo
      option.text = motivo.descripcion_motivo
      this.#motivo.appendChild(option)
    })

    this.#estadosCiviles.forEach(estadoCivil => {
      const option = document.createElement('option')
      option.value = estadoCivil.id_estado_civil
      option.text = estadoCivil.estado_civil
      this.#estadoCivil.appendChild(option)
    })
  }

  validateInputs() {
    this.#estatusTrabajo = this.shadowRoot.querySelector(
      'input[name="rb-trabajo"]:checked'
    )?.value
    this.#ingreso = this.shadowRoot.querySelector(
      'input[name="rb-ingreso"]:checked'
    )?.value
    const inputs = [
      this.#nombre.value,
      this.#apellidoPaterno.value,
      this.#apellidoMaterno.value,
      this.#edad.value,
      this.#sexo.value,
      this.#telefono.value,
      this.#estatusTrabajo,
      this.#estadoCivil.value,
      this.#numeroHijos.value,
      this.#domicilio.data.calle,
      this.#domicilio.data.numeroExt,
      this.#domicilio.data.colonia,
    ]
    try {
      if (!validateNonEmptyFields(inputs)) {
        throw new ValidationError(
          'Campos obligatorios en blanco, por favor revise.'
        )
      }
      if (
        (this.#estatusTrabajo === 'yes' && !this.#ingreso) ||
        (this.#estatusTrabajo === 'no' && !this.#motivo)
      ) {
        throw new ValidationError(
          'Campos obligatorios en blanco, por favor revise.'
        )
      }

      return true
    } catch (error) {
      if (error instanceof ValidationError) {
        this.#showModal(error.message, 'Error de validación')
      } else {
        console.error(error)
        this.#showModal(
          'Error al registrar el turno, por favor intenta de nuevo',
          'Error'
        )
      }

      return false
    }
  }

  connectedCallback() {
    this.btnNext = this.shadowRoot.getElementById('btn-asesorado-next')
    const radioButtons = this.shadowRoot.querySelectorAll(
      'input[name="rb-trabajo"]'
    )
    const ingresoContainer = this.shadowRoot.getElementById('ingreso-container')
    const motivoContainer = this.shadowRoot.getElementById('motivo-container')

    radioButtons.forEach(radioButton => {
      radioButton.addEventListener('change', event => {
        if (event.target.value === 'yes') {
          ingresoContainer.classList.remove('hidden')
          ingresoContainer.classList.add('flex')
          motivoContainer.classList.add('hidden')
        } else {
          ingresoContainer.classList.add('hidden')
          ingresoContainer.classList.remove('flex')
          motivoContainer.classList.remove('hidden')
          motivoContainer.classList.add('flex')
        }
      })
    })

    this.btnNext.addEventListener('click', () => {
      if (!this.validateInputs()) return
      const event = new CustomEvent('next', {
        bubbles: true,
        composed: true,
        detail: { tabId: 'asesoria' },
      })
      this.dispatchEvent(event)
    })
  }

  #showModal(message, title, onCloseCallback) {
    const modal = document.querySelector('modal-warning')
    modal.message = message
    modal.title = title
    modal.open = true
    modal.setOnCloseCallback(onCloseCallback)
  }

  get id() {
    return this.getAttribute('id')
  }

  set id(value) {
    this.setAttribute('id', value)
  }

  get isComplete() {
    return this.validateInputs()
  }

  get data() {
    const asesorado = {
      estatus_trabajo: this.#estatusTrabajo === 'yes',
      numero_hijos: Number(this.#numeroHijos.value),
      ingreso_mensual: Number(this.#ingreso) || null,
      motivo: {
        id_motivo: Number(this.#motivo.value),
      },
      estado_civil: {
        id_estado_civil: Number(this.#estadoCivil.value),
        estado_civil:
          this.#estadoCivil.options[this.#estadoCivil.selectedIndex].text,
      },
    }
    const persona = {
      nombre: this.#nombre.value,
      apellido_paterno: this.#apellidoPaterno.value,
      apellido_materno: this.#apellidoMaterno.value,
      edad: Number(this.#edad.value),
      telefono: this.#telefono.value,
      domicilio: {
        calle_domicilio: this.#domicilio.data.calle,
        numero_exterior_domicilio: this.#domicilio.data.numeroExt,
        numero_interior_domicilio: this.#domicilio.data.numeroInt,
        id_colonia: this.#domicilio.data.colonia,
      },
      genero: {
        id_genero: Number(this.#sexo.value),
        descripcion_genero: this.#sexo.options[this.#sexo.selectedIndex].text,
      },
    }

    return {
      asesorado,
      persona,
    }
  }

  set data(value) {
    this.setAttribute('data', value)
  }
}

customElements.define('asesorado-full-tab', AsesoradoTab)
