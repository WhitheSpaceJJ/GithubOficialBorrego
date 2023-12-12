/* eslint-disable indent */
import { ValidationError } from '../../lib/errors'
import { getDate, validateNonEmptyFields } from '../../lib/utils'
import { APIModel } from '../../models/api.model'

const template = document.createElement('template')

const html = await (await fetch('../assets/turnar/turno-tab.html')).text()
template.innerHTML = html

export class TurnoTab extends HTMLElement {
  #asesoria
  #asesores
  #defensores
  #usuario
  #api

  #resumen
  #nombreAsesor
  #nombreDefensor
  #responsableTurno
  #horaTurno
  #minutoTurno
  #turnadoPorAsesor

  static get observedAttributes() {
    return ['id', 'data']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    this.id = 'turno'
    this.style.display = 'none'

    this.#asesoria = JSON.parse(sessionStorage.getItem('asesoria'))
    this.#usuario = JSON.parse(sessionStorage.getItem('user'))

    this.#api = new APIModel()
    this.#initialize()
  }

  async #initialize() {
    await this.#fetchEmpleados()

    this.#manageFormFields()
    this.#fillInputs()
  }

  async #fetchEmpleados() {
    try {
      const data = await this.#api.getAsesores()
      this.#asesores = data.asesores
    } catch (error) {
      throw new Error('No se pudieron obtener los asesores')
    }

    try {
      const data = await this.#api.getDefensores()
      this.#defensores = data.defensores
    } catch (error) {
      throw new Error('No se pudieron obtener los defensores')
    }
  }

  #manageFormFields() {
    this.#resumen = this.shadowRoot.getElementById('resumen')
    this.#nombreAsesor = this.shadowRoot.getElementById('nombre-asesor')
    this.#nombreDefensor = this.shadowRoot.getElementById('nombre-defensor')
    this.#responsableTurno = this.shadowRoot.getElementById('responsable-turno')
    this.#horaTurno = this.shadowRoot.getElementById('hora-turno')
    this.#minutoTurno = this.shadowRoot.getElementById('minuto-turno')
    this.#turnadoPorAsesor =
      this.shadowRoot.getElementById('cbx-turnado-asesor')
  }

  #fillInputs() {
    this.#resumen.value = this.#asesoria.datos_asesoria.resumen_asesoria

    // fill select
    this.#asesores.forEach(asesor => {
      const option = document.createElement('option')
      option.value = asesor.id_asesor
      option.textContent = `${asesor.nombre_asesor}`
      this.#nombreAsesor.appendChild(option)
    })
    this.#defensores.forEach(defensor => {
      const option = document.createElement('option')
      option.value = defensor.id_defensor
      option.textContent = `${defensor.nombre_defensor}`
      this.#nombreDefensor.appendChild(option)
    })
    if (this.#asesoria.asesor) {
      this.#nombreAsesor.value = this.#asesoria.asesor.id_asesor

      this.shadowRoot
        .getElementById('asesor-container')
        .classList.remove('hidden')
    } else {
      this.#nombreDefensor.value = this.#asesoria.defensor.id_defensor
      this.shadowRoot
        .getElementById('defensor-container')
        .classList.remove('hidden')
    }
    this.#turnadoPorAsesor.checked = Boolean(this.#asesoria.turno)
    this.#responsableTurno.value = this.#usuario.name

    const [hora, minuto] = this.#asesoria?.turno?.hora_turno?.split(':') ?? []
    this.#horaTurno.value = hora ?? ''
    this.#minutoTurno.value = minuto ?? ''
  }

  connectedCallback() {
    this.btnTurnar = this.shadowRoot.getElementById('btn-registrar-turno')
    this.domicilioTab = document.querySelector('domicilio-tab')
    this.asesoradoTab = document.querySelector('asesorado-tab')

    this.btnTurnar.addEventListener('click', async () => {
      const turnoData = this.data
      const domicilioData = this.domicilioTab.data
      const asesoradoData = this.asesoradoTab.data

      const { numeroInt, ...restDomicilioData } = domicilioData
      const data = {
        ...asesoradoData,
        ...(numeroInt ? { ...domicilioData } : { ...restDomicilioData }),
        ...turnoData,
      }
      console.log(data)
      const inputs = Object.values(data)
      console.log(inputs.slice(0, -1))

      try {
        if (!validateNonEmptyFields(inputs.slice(0, -1))) {
          throw new ValidationError(
            'Campos obligatorios en blanco, por favor revise.'
          )
        }

        // replace asesorado and domicilio data
        this.#asesoria.persona = {
          ...this.#asesoria.persona,
          ...asesoradoData,
          domicilio: {
            ...this.#asesoria.persona.domicilio,
            calle_domicilio: data.calle,
            numero_exterior_domicilio: data.numeroExt,
            numero_interior_domicilio: data.numeroInt,
          },
        }
        // replace turno data
        this.#asesoria.datos_asesoria = {
          ...this.#asesoria.datos_asesoria,
          resumen_asesoria: data.resumen,
          usuario: this.#usuario.name,
          id_empleado: turnoData.empleado,
        }

        this.#asesoria.turno = {
          fecha_turno: getDate(),
          hora_turno: `${data.horaTurno}:${data.minutoTurno}`,
        }
        delete this.#asesoria.asesor
        console.log(this.#asesoria)
        console.log(JSON.stringify(this.#asesoria))

        console.log(
          await this.#api.putAsesoria({
            id: this.#asesoria.datos_asesoria.id_asesoria,
            data: this.#asesoria,
          })
        )

        /* this.#showModal('Turno registrado con éxito', 'Registrar turno', () => {
          location.href = '/'
        }) */
      } catch (error) {
        if (error instanceof ValidationError) {
          this.#showModal(error.message, 'Error de validación')
        } else {
          console.error(error)
          this.#showModal(
            'Error al registrar el turno, por favor intenta de nuevo',
            'Error'
          )
        }
      }
    })
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
    const idEmpelado = this.#asesoria.asesor
      ? this.#asesores.find(
          asesor => asesor.id_asesor === Number(this.#nombreAsesor.value)
        )
      : this.#defensores.find(
          defensor =>
            defensor.id_defensor === Number(this.#nombreDefensor.value)
        )
    return {
      resumen: this.#resumen.value,
      empleado: idEmpelado,
      responsableTurno: this.#usuario.name,
      horaTurno: this.#horaTurno.value,
      minutoTurno: this.#minutoTurno.value,
      turnadoPorAsesor: this.#turnadoPorAsesor.checked,
    }
  }

  set data(value) {
    this.setAttribute('data', value)
  }
}

customElements.define('turno-tab', TurnoTab)
