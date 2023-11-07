import { APIModel } from '../../models/api.model'

const template = document.createElement('template')

const html = await (await fetch('../assets/turnar/asesorado-tab.html')).text()
template.innerHTML = html

export class AsesoradoTab extends HTMLElement {
  #asesoria
  #api
  #generos

  #nombre
  #apellidoPaterno
  #apellidoMaterno
  #edad
  #sexo

  static get observedAttributes() {
    return ['id', 'data']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    this.id = 'asesorado'

    this.#asesoria = JSON.parse(sessionStorage.getItem('asesoria'))

    this.#api = new APIModel()
    this.#api.getGeneros().then(data => {
      this.#generos = data.generos

      this.manageFormFields()
      this.fillInputs()
    })
  }

  manageFormFields() {
    this.#nombre = this.shadowRoot.getElementById('nombre')
    this.#apellidoPaterno = this.shadowRoot.getElementById('apellido-paterno')
    this.#apellidoMaterno = this.shadowRoot.getElementById('apellido-materno')
    this.#edad = this.shadowRoot.getElementById('edad')
    this.#sexo = this.shadowRoot.getElementById('sexo')
  }

  fillInputs() {
    this.#nombre.value = this.#asesoria.persona.nombre
    this.#apellidoPaterno.value = this.#asesoria.persona.apellido_paterno
    this.#apellidoMaterno.value = this.#asesoria.persona.apellido_materno
    this.#edad.value = this.#asesoria.persona.edad

    this.#generos.forEach(genero => {
      const option = document.createElement('option')
      option.value = genero.id_genero
      option.text = genero.descripcion_genero
      this.#sexo.appendChild(option)
    })
    this.#sexo.value = this.#asesoria.persona.genero.id_genero
  }

  connectedCallback() {
    this.btnNext = this.shadowRoot.getElementById('btn-asesorado-next')
    this.editCbx = this.shadowRoot.getElementById('cbx-editable-asesorado')

    this.btnNext.addEventListener('click', () => {
      const event = new CustomEvent('next', {
        bubbles: true,
        composed: true,
        detail: { tabId: 'domicilio' },
      })
      this.dispatchEvent(event)
    })

    this.editCbx.addEventListener('change', () => {
      const inputs = this.shadowRoot.querySelectorAll('input, select')
      inputs.forEach(input => {
        if (input !== this.editCbx) {
          input.disabled = !input.disabled
        }
      })
    })

    // Escucha el evento de cambio de pestaña
    document.addEventListener('tab-change', event => {
      if (event.detail.tabId === 'asesorado') {
        // clg
      }
    })
  }

  get id() {
    return this.getAttribute('id')
  }

  set id(value) {
    this.setAttribute('id', value)
  }

  get data() {
    return {
      nombre: this.#nombre.value,
      apellido_paterno: this.#apellidoPaterno.value,
      apellido_materno: this.#apellidoMaterno.value,
      edad: Number(this.#edad.value),
      genero: this.#generos.find(
        genero => genero.id_genero === Number(this.#sexo.value)
      ),
    }
  }

  set data(value) {
    this.setAttribute('data', value)
  }
}

customElements.define('asesorado-tab', AsesoradoTab)
