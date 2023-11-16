import { ValidationError } from '../../lib/errors'
import { getDate, validateNonEmptyFields } from '../../lib/utils'
import { APIModel } from '../../models/api.model'

const template = document.createElement('template')

const html = await (
  await fetch('./components/asesoria/asesoria-tab.html')
).text()
template.innerHTML = html

export class AsesoriaTab extends HTMLElement {
  #api
  #asesores
  #tiposJuicio

  #asesor
  #tipoJuicio
  #resumen
  #conclusion
  #recibido
  #recibidoValue
  #requisitos
  #requisitosValue

  static get observedAttributes() {
    return ['id', 'data']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this.id = 'asesoria'
    this.style.display = 'none'

    this.init()
  }

  async init() {
    this.#api = new APIModel()

    const { asesores } = await this.#api.getAsesores()
    this.#asesores = asesores

    const { tiposDeJuicio } = await this.#api.getTiposJuicio()
    this.#tiposJuicio = tiposDeJuicio

    this.manageFormFields()
    this.fillInputs()
  }

  manageFormFields() {
    this.#asesor = this.shadowRoot.getElementById('asesor')
    this.#tipoJuicio = this.shadowRoot.getElementById('tipo-juicio')
    this.#resumen = this.shadowRoot.getElementById('resumen')
    this.#conclusion = this.shadowRoot.getElementById('conclusion')
    this.#recibido = this.shadowRoot.querySelectorAll(
      '#recibido input[type="checkbox"]'
    )
    this.#requisitos = this.shadowRoot.querySelectorAll(
      'input[type="radio"][name="rb-requisitos"]'
    )
  }

  fillInputs() {
    this.#asesores.forEach(asesor => {
      const option = document.createElement('option')
      option.value = asesor.id_asesor
      option.textContent = asesor.nombre_asesor
      this.#asesor.appendChild(option)
    })

    this.#tiposJuicio.forEach(tipoJuicio => {
      const option = document.createElement('option')
      option.value = tipoJuicio.id_tipo_juicio
      option.textContent = tipoJuicio.tipo_juicio
      this.#tipoJuicio.appendChild(option)
    })
  }

  getValues() {
    const checkboxesMarcados = Array.from(this.#recibido).filter(
      checkbox => checkbox.checked
    )
    this.#recibidoValue = checkboxesMarcados.map(checkbox => {
      return {
        id_catalogo: Number(checkbox.value),
        descripcion_catalogo: checkbox.dataset.name,
      }
    })

    const radioSeleccionado = Array.from(this.#requisitos).find(
      radio => radio.checked
    )
    this.#requisitosValue = radioSeleccionado
      ? radioSeleccionado.value
      : undefined
  }

  validateInputs() {
    this.getValues()

    const inputs = [
      this.#asesor.value,
      this.#tipoJuicio.value,
      this.#resumen.value,
      this.#conclusion.value,
      this.#recibidoValue.length,
      this.#requisitosValue,
    ]

    try {
      if (!validateNonEmptyFields(inputs)) {
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
    this.btnNext = this.shadowRoot.getElementById('btn-asesoria-next')

    this.btnNext.addEventListener('click', () => {
      if (!this.validateInputs()) return
      const event = new CustomEvent('next', {
        bubbles: true,
        composed: true,
        detail: { tabId: 'detalles' },
      })
      this.dispatchEvent(event)
    })

    document.addEventListener('tab-change', event => {})
  }

  #showModal(message, title, onCloseCallback) {
    const modal = document.querySelector('modal-warning')
    modal.message = message
    modal.title = title
    modal.open = true
    modal.setOnCloseCallback(onCloseCallback)
  }

  get isComplete() {
    return this.validateInputs()
  }

  get data() {
    this.getValues()

    const datos_asesoria = {
      resumen_asesoria: this.#resumen.value,
      conclusion_asesoria: this.#conclusion.value,
      estatus_requisitos: this.#requisitosValue === 'yes',
      fecha_registro: getDate(),
      usuario: this.#api.user.name,
    }
    const recibidos = this.#recibidoValue.map(
      ({ id_catalogo, descripcion_catalogo }) => {
        return {
          id_catalogo: Number(id_catalogo),
          descripcion_catalogo,
        }
      }
    )
    const tipos_juicio = {
      id_tipo_juicio: Number(this.#tipoJuicio.value),
      tipo_juicio:
        this.#tipoJuicio.options[this.#tipoJuicio.selectedIndex].text,
    }
    const asesor = {
      id_asesor: Number(this.#asesor.value),
      nombre_asesor: this.#asesor.options[this.#asesor.selectedIndex].text,
    }

    return {
      datos_asesoria,
      recibidos,
      tipos_juicio,
      asesor,
    }
  }

  set data(value) {
    this.setAttribute('data', value)
  }

  get id() {
    return this.getAttribute('id')
  }

  set id(value) {
    this.setAttribute('id', value)
  }
}

customElements.define('asesoria-tab', AsesoriaTab)
