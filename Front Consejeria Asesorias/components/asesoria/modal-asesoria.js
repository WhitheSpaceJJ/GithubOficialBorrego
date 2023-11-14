const template = document.createElement('template')

const html = await (await fetch('../assets/modal-asesoria.html')).text()
template.innerHTML = html

export class ModalAsesoria extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'title', 'onClose']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    this.onClose = () => {
      const modal = this.shadowRoot.getElementById('modal')
      modal.style.display = 'none'
      this.setAttribute('open', 'false')
    }
  }

  connectedCallback() {
    this.btnClose = this.shadowRoot.getElementById('btn-close')
    this.modal = this.shadowRoot.getElementById('modal')
    this.btnAceptar = this.shadowRoot.getElementById('btn-aceptar')

    this.btnClose.addEventListener('click', this.onClose)

    this.btnAceptar.addEventListener('click', this.onClose)

    this.modal.addEventListener('click', e => {
      if (e.target === this.modal) {
        this.onClose()
      }
    })
  }

  setOnCloseCallback(callback) {
    // Permite configurar la función de cierre desde fuera de la clase
    this._onCloseCallback = callback
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open' && newValue === 'true') {
      const alerta = this.shadowRoot.getElementById('modal')
      alerta.style.display = 'flex'
    }
  }

  get open() {
    return this.getAttribute('open')
  }

  set open(value) {
    this.setAttribute('open', value)
  }

  get title() {
    return this.getAttribute('title')
  }

  set title(value) {
    this.shadowRoot.getElementById('title-alerta').innerHTML = value
  }
}

customElements.define('modal-asesoria', ModalAsesoria)
