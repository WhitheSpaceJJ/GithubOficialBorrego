import { APIModel } from '../../models/api.model'
import { DataAsesoria } from './data-asesoria'

const template = document.createElement('template')

const html = await (
  await fetch('./components/asesoria/detalles-tab.html')
).text()
template.innerHTML = html

export class DetallesTab extends HTMLElement {
  #api
  #asesoria

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this.id = 'detalles'
    this.style.display = 'none'

    this.asesoradoTab = document.querySelector('asesorado-full-tab')
    this.asesoriaTab = document.querySelector('asesoria-tab')
  }

  async init() {
    this.#api = new APIModel()
    const $section = this.shadowRoot.getElementById('detalles')

    this.#asesoria = {
      ...this.asesoradoTab.data,
      ...this.asesoriaTab.data,
    }
    const domicilio = await this.#api.getColoniaById(
      this.#asesoria.persona.domicilio.id_colonia
    )

    const dataAsesoria = new DataAsesoria(
      { asesoria: this.#asesoria },
      domicilio
    )
    $section.appendChild(dataAsesoria)
  }

  connectedCallback() {
    this.btnCrearAsesoria = this.shadowRoot.getElementById('btn-crear-asesoria')

    this.btnCrearAsesoria.addEventListener('click', async () => {
      try {
        await this.#api.postAsesoria(this.#asesoria)
        this.#showModal(
          'La asesoría se ha creado correctamente',
          'Asesoría creada',
          () => {
            location.href = '/'
          }
        )
      } catch (error) {
        console.error(error)
        this.#showModal(
          'Ocurrió un error al crear la asesoría',
          'Error al crear asesoría'
        )
      }
    })

    document.addEventListener('tab-change', event => {
      const tabId = event.detail.tabId
      if (tabId !== 'detalles') {
        return
      }
      this.init()
    })
  }

  #showModal(message, title, onCloseCallback) {
    const modal = document.querySelector('modal-warning')
    modal.message = message
    modal.title = title
    modal.open = true
    modal.setOnCloseCallback(onCloseCallback)
  }
}

customElements.define('detalles-tab', DetallesTab)
