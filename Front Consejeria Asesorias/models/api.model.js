class APIModel {
  USERS_API_URL = "http://localhost:3002"
  ASESORIAS_API_URL = "http://localhost:3000"
  CP_API_URL = "http://localhost:3001"
  user = JSON.parse(sessionStorage.getItem("user"))

  constructor() {}

  //GET methods

  async login({ correo, password }) {
    const url = `${this.USERS_API_URL}/usuarios/usuario?correo=${correo}&password=${password}`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error("Error en la petición")
    }
  }

  async consultarAsesorias() {
    const url = `${this.ASESORIAS_API_URL}/asesorias`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error("Error en la petición")
    }
  }
  
  async getAsesoriaByFullName({ nombre, apellidoPaterno, apellidoMaterno }) {
    const url = new URL(`${this.ASESORIAS_API_URL}/asesorias/buscar`)
    const params = {
      nombre: nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
    }
    url.search = new URLSearchParams(params).toString()

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error("Error en la petición")
    }
  }

  async consultarAsesoriaById(id){
    const url = `${this.ASESORIAS_API_URL}/asesorias/asesoria?id=${id}`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error("Error en la petición")
    }
  }

  async getColoniaById(idColonia) {
    const url = `${this.CP_API_URL}/colonias/${idColonia}`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error("Error en la petición")
    }
  }
}

export { APIModel }
