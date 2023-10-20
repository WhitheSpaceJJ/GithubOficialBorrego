const template = document.createElement('template')

class TurnarTabs extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true)
    )

    this.btnAsesorado = this.shadowRoot.getElementById('btn-asesorado')
    this.btnDomicilio = this.shadowRoot.getElementById('btn-domicilio')
    this.btnTurno = this.shadowRoot.getElementById('btn-turno')

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
    this.btnDomicilio.addEventListener('click', () =>
      this.handleTabClick('domicilio')
    )
    this.btnTurno.addEventListener('click', () => this.handleTabClick('turno'))
  }

  handleTabClick(tabId) {
    this.showTabSection(tabId)
    this.dispatchEventTabChangeEvent(tabId)
    this.updateAriaAttributes(tabId)
  }

  showTabSection(tabId) {
    const tabSections = document.querySelectorAll(
      'asesorado-tab, domicilio-tab, turno-tab'
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
    const tabs = ['btn-asesorado', 'btn-domicilio', 'btn-turno']
    tabs.forEach(tab => {
      const isSelected = tab === `btn-${activeTab}`
      this.shadowRoot
        .getElementById(tab)
        .setAttribute('aria-selected', isSelected)
    })
  }
}

const html = await (await fetch('../assets/turnar/tabs.html')).text()
template.innerHTML = html

customElements.define('turnar-tabs', TurnarTabs)
