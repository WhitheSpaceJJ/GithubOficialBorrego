const template = document.createElement('template')

const html = await (await fetch('../assets/turnar/domicilio-tab.html')).text()
template.innerHTML = html

export class DomicilioTab extends HTMLElement {
  #asesoria
  #domicilio

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
    this.id = 'domicilio'
    this.style.display = 'none'

    this.#asesoria = JSON.parse(sessionStorage.getItem('asesoria'))
    this.#domicilio = JSON.parse(sessionStorage.getItem('colonia'))
    console.log(this.#domicilio)

    this.manageFormFields()
    this.fillInputs()
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

  fillInputs() {
    this.#calle.value = this.#asesoria.persona.domicilio.calle_domicilio
    this.#numeroExt.value =
      this.#asesoria.persona.domicilio.numero_exterior_domicilio
    this.#numeroInt.value =
      this.#asesoria.persona.domicilio.numero_interior_domicilio
    this.#cp.value = this.#domicilio.codigo_postal.codigo_postal
    this.#municipio.value = this.#domicilio.municipio.nombre_municipio
    this.#estado.value = this.#domicilio.estado.nombre_estado
    this.#ciudad.value = this.#domicilio.ciudad.nombre_ciudad
    this.#colonia.value = this.#domicilio.colonia.nombre_colonia
  }

  connectedCallback() {
    this.btnNext = this.shadowRoot.getElementById('btn-domicilio-next')
    this.editCbx = this.shadowRoot.getElementById('cbx-editable-domicilio')

    this.btnNext.addEventListener('click', () => {
      const event = new CustomEvent('next', {
        bubbles: true,
        composed: true,
        detail: { tabId: 'turno' },
      })
      this.dispatchEvent(event)
    })

    this.editCbx.addEventListener('change', () => {
      this.#toggleInputDisabled()
    })
  }

  #toggleInputDisabled() {
    // Habilitar o deshabilitar inputs: calle, numeroExt, numeroInt
    this.#calle.disabled = !this.#calle.disabled
    this.#numeroExt.disabled = !this.#numeroExt.disabled
    this.#numeroInt.disabled = !this.#numeroInt.disabled
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

customElements.define('domicilio-tab', DomicilioTab)
