class APIModel {
  apiUrl = "http://localhost:3002"
  user = JSON.parse(sessionStorage.getItem("user"))

  constructor() {}

  //GET methods

  async login(correo, password) {
    const url = `${this.apiUrl}/usuarios/usuario?correo=${correo}&password=${password}`
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
}

export { APIModel }
