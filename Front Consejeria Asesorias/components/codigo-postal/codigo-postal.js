import { APIModel } from '../../models/api.model'

const template = document.createElement('template')

const html = await (
  await fetch('/components/codigo-postal/codigo-postal.html')
).text()
template.innerHTML = html

export class CodigoPostal extends HTMLElement {
  #API

  #calle
  #numeroExt
  #numeroInt
  #cp
  #municipio
  #estado
  #ciudad
  #colonia

  static get observedAttributes() {
    return ['id', 'data']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this.#API = new APIModel()

    this.manageFormFields()
  }

  manageFormFields() {
    this.#calle = this.shadowRoot.getElementById('calle')
    this.#numeroExt = this.shadowRoot.getElementById('numero-ext')
    this.#numeroInt = this.shadowRoot.getElementById('numero-int')
    this.#cp = this.shadowRoot.getElementById('codigo-postal')
    this.#municipio = this.shadowRoot.getElementById('municipio')
    this.#estado = this.shadowRoot.getElementById('estado')
    this.#ciudad = this.shadowRoot.getElementById('ciudad')
    this.#colonia = this.shadowRoot.getElementById('colonia')
  }

  connectedCallback() {
    this.formCP = this.shadowRoot.getElementById('form-cp')

    this.formCP.addEventListener('submit', e => {
      e.preventDefault()
      if (
        !this.#cp.value ||
        this.#cp.value.length !== 5 ||
        isNaN(this.#cp.value)
      ) {
        this.#showModal('El código postal debe tener 5 dígitos', 'Advertencia')
        return
      }
      this.searchCP()
    })
  }

  async searchCP() {
    try {
      const { data } = await this.#API.getDomicilioByCP(this.#cp.value)
      if (!data || typeof data === 'string') {
        this.#showModal('No se encontró el código postal', 'Advertencia')
        return
      }
      console.log(data)

      this.#estado.value = data.estado.nombre_estado
      this.#municipio.value = data.municipio.nombre_municipio
      this.#ciudad.value = data.ciudad.nombre_ciudad

      data.colonias.forEach(colonia => {
        const option = document.createElement('option')
        option.value = colonia.id_colonia
        option.textContent = colonia.nombre_colonia
        this.#colonia.appendChild(option)
      })
      console.log(this.data)
    } catch (error) {
      console.error(error)
      this.#showModal('Error al buscar el código postal', 'Error')
    }
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

  get data() {
    return {
      calle: this.#calle.value,
      numeroExt: this.#numeroExt.value,
      numeroInt: this.#numeroInt.value,
      cp: this.#cp.value,
      estado: this.#estado.value,
      municipio: this.#municipio.value,
      ciudad: this.#ciudad.value,
      colonia: this.#colonia.value,
    }
  }

  set data(value) {
    this.setAttribute('data', value)
  }
}

customElements.define('cp-comp', CodigoPostal)
