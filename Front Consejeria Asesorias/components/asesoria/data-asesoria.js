const template = document.createElement('template')

const html = await (await fetch('../assets/data-asesoria.html')).text()
template.innerHTML = html

export class DataAsesoria extends HTMLElement {
  constructor(asesoria, domicilio) {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    this.asesoria = asesoria
    this.domicilio = domicilio
    this.fillData(this.asesoria, this.domicilio)
  }

  connectedCallback() {
  }

  fillData = async () => {
    const persona = this.asesoria.asesoria.persona
    const asesorado = this.asesoria.asesoria.asesorado
    const datosAsesoria = this.asesoria.asesoria.datos_asesoria
    const recibidos = this.asesoria.asesoria.recibidos

    const domicilioData = this.domicilio.colonia
    this.shadowRoot.getElementById(
      'nombre-asesorado'
    ).textContent = `${persona.nombre} ${persona.apellido_paterno} ${persona.apellido_materno}`
    this.shadowRoot.getElementById('edad').textContent = persona.edad
    this.shadowRoot.getElementById('sexo').textContent = persona.genero.descripcion_genero
    this.shadowRoot.getElementById('telefono').textContent = persona.telefono
    if (this.asesoria.asesoria.asesorado.estatus_trabajo) this.shadowRoot.getElementById('trabaja-boolean').textContent = 'Si'
    else this.shadowRoot.getElementById('trabaja-boolean').textContent = 'No'
    this.shadowRoot.getElementById('estado-civil').textContent =
      asesorado.estado_civil.estado_civil
    this.shadowRoot.getElementById('numero-hijos').textContent =
      asesorado.numero_hijos

    this.shadowRoot.getElementById('calle').textContent = persona.domicilio.calle_domicilio
    this.shadowRoot.getElementById('numero-exterior').textContent = persona.domicilio.numero_exterior_domicilio
    this.shadowRoot.getElementById('numero-interior').textContent = persona.domicilio.numero_interior_domicilio
    this.shadowRoot.getElementById('codigo-postal').textContent = domicilioData.codigo_postal.codigo_postal
    this.shadowRoot.getElementById('estado').textContent = domicilioData.estado.nombre_estado
    this.shadowRoot.getElementById('municipio').textContent = domicilioData.municipio.nombre_municipio
    this.shadowRoot.getElementById('ciudad').textContent = domicilioData.ciudad.nombre_ciudad
    this.shadowRoot.getElementById('colonia').textContent = domicilioData.colonia.nombre_colonia
    if (this.asesoria.asesoria.empleado) {
      const empleado = this.asesoria.asesoria.empleado
      if (empleado.hasOwnProperty('nombre_asesor')) {
        this.shadowRoot.getElementById('nombre-asesor-defensor').textContent = "Nombre del asesor:"
        this.shadowRoot.getElementById('nombre-asesor').textContent = empleado.nombre_asesor;

      } else {
        this.shadowRoot.getElementById('nombre-asesor-defensor').textContent = "Nombre del defensor:"
        this.shadowRoot.getElementById('nombre-asesor').textContent = empleado.nombre_defensor;
      }
    } else {
      if (this.asesoria.asesoria.asesor) {
        this.shadowRoot.getElementById('nombre-asesor-defensor').textContent = "Nombre del asesor:"
        this.shadowRoot.getElementById('nombre-asesor').textContent = this.asesoria.asesoria.asesor.nombre_asesor;
      } else {
        this.shadowRoot.getElementById('nombre-asesor-defensor').textContent = "Nombre del defensor:"
        this.shadowRoot.getElementById('nombre-asesor').textContent = this.asesoria.asesoria.defensor.nombre_defensor;
      }
    }

    this.shadowRoot.getElementById('tipo-juicio').textContent = this.asesoria.asesoria.tipos_juicio.tipo_juicio

    this.shadowRoot.getElementById('resumen').textContent = datosAsesoria.resumen_asesoria
    this.shadowRoot.getElementById('conclusion').textContent = datosAsesoria.conclusion_asesoria
    recibidos.forEach(item => {
      const element = document.createElement('p')
      element.textContent = item.descripcion_catalogo
      this.shadowRoot.getElementById('asesorado-recibio').appendChild(element)
    })

    if (datosAsesoria.estatus_requisitos) this.shadowRoot.getElementById('cumple-requisitos').textContent = 'Si'
    else this.shadowRoot.getElementById('cumple-requisitos').textContent = 'No'
  }
}

customElements.define('data-asesoria', DataAsesoria)
