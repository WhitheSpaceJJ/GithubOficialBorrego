const template = document.createElement('template')

class AsesoriaTabs extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true)
    )

    this.btnAsesorado = this.shadowRoot.getElementById('btn-asesorado')
    this.btnAsesoria = this.shadowRoot.getElementById('btn-asesoria')
    this.btnDetalles = this.shadowRoot.getElementById('btn-detalles')

    this.addClickEventListeners()
  }

  connectedCallback() {
    document.addEventListener('next', event => {
      const tabId = event.detail.tabId
      this.handleTabClick(tabId)
    })
  }

  addClickEventListeners() {
    this.btnAsesorado.addEventListener('click', () =>
      this.handleTabClick('asesorado')
    )
    this.btnAsesoria.addEventListener('click', () =>
      this.handleTabClick('asesoria')
    )
    this.btnDetalles.addEventListener('click', () =>
      this.handleTabClick('detalles')
    )
  }

  handleTabClick(tabId) {
    this.showTabSection(tabId)
    this.dispatchEventTabChangeEvent(tabId)
    this.updateAriaAttributes(tabId)
  }

  showTabSection(tabId) {
    const tabSections = document.querySelectorAll(
      'asesorado-full-tab, asesoria-tab, detalles-tab'
    )
    tabSections.forEach(section => {
      section.style.display = 'none'
    })

    let tabToDisplay
    tabSections.forEach(section => {
      return section.id === tabId && (tabToDisplay = section)
    })
    tabToDisplay.style.display = 'block'
  }

  dispatchEventTabChangeEvent(tabId) {
    const event = new CustomEvent('tab-change', {
      bubbles: true,
      composed: true,
      detail: { tabId },
    })
    this.dispatchEvent(event)
  }

  updateAriaAttributes(activeTab) {
    const tabs = ['btn-asesorado', 'btn-asesoria', 'btn-detalles']
    tabs.forEach(tab => {
      const isSelected = tab === `btn-${activeTab}`
      this.shadowRoot
        .getElementById(tab)
        .setAttribute('aria-selected', isSelected)
    })
  }
}

const html = await (await fetch('./components/asesoria/tabs.html')).text()
template.innerHTML = html

customElements.define('asesoria-tabs', AsesoriaTabs)
