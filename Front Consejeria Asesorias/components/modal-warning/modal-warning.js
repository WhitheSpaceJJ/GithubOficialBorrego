const template = document.createElement('template')

const html = await (await fetch('../assets/modal-warning.html')).text()
template.innerHTML = html

export class Modal extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'message', 'title', 'onClose']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this._onCloseCallback = null

    this.onClose = () => {
      const alerta = this.shadowRoot.getElementById('alerta')
      alerta.style.display = 'none'
      this.setAttribute('open', 'false')

      // Si hay una función de cierre configurada, llámala
      if (typeof this._onCloseCallback === 'function') {
        this._onCloseCallback()
      }
    }
  }

  connectedCallback() {
    this.btnCloseAlerta = this.shadowRoot.getElementById('btn-close-alerta')
    this.idAlerta = this.shadowRoot.getElementById('alerta')
    this.btnAceptarAlerta = this.shadowRoot.getElementById('btn-aceptar-alerta')

    this.btnCloseAlerta.addEventListener('click', this.onClose)

    this.btnAceptarAlerta.addEventListener('click', this.onClose)

    this.idAlerta.addEventListener('click', e => {
      if (e.target === this.idAlerta) {
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
      const alerta = this.shadowRoot.getElementById('alerta')
      alerta.style.display = 'flex'
    }
  }

  get message() {
    return this.getAttribute('message')
  }

  set message(value) {
    this.shadowRoot.getElementById('mensaje-alerta').innerHTML = value
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

customElements.define('modal-warning', Modal)
