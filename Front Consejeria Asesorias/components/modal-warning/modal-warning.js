const template = document.createElement("template")

const html = await (await fetch("../assets/modal-warning.html")).text()
template.innerHTML = html

export class Modal extends HTMLElement {
  static get observedAttributes() {
    return ["open", "message"]
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })
    shadow.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    this.btnCloseAlerta = this.shadowRoot.getElementById("btn-close-alerta")
    this.idAlerta = this.shadowRoot.getElementById("alerta")

    this.btnCloseAlerta.addEventListener(
      "click",
      () => {
        const alerta = this.shadowRoot.getElementById("alerta")
        alerta.style.display = "none"
        this.setAttribute("open", "false")
      },
      { once: true }
    )

    this.idAlerta.addEventListener("click", e => {
      if (e.target === this.idAlerta) {
        const alerta = this.shadowRoot.getElementById("alerta")
        alerta.style.display = "none"
        this.setAttribute("open", "false")
      }
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "open" && newValue === "true") {
      const alerta = this.shadowRoot.getElementById("alerta")
      alerta.style.display = "flex"
    }
  }

  get message() {
    return this.getAttribute("message")
  }

  set message(value) {
    this.shadowRoot.getElementById("mensaje-alerta").innerHTML = value
  }

  get open() {
    return this.getAttribute("open")
  }

  set open(value) {
    this.setAttribute("open", value)
  }
}

customElements.define("modal-warning", Modal)
