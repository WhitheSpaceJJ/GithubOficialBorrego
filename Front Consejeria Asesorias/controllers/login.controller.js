import { validateNonEmptyFields } from "../lib/utils"

class LoginController {
  constructor(model) {
    this.model = model
  }

  //Methods
  handleLogin = async () => {
    const correo = document.getElementById("correo").value
    const password = document.getElementById("password").value
    try {
      if (!validateNonEmptyFields([correo, password])) {
        throw new Error("Campos obligatorios en blanco, por favor revise.")
      }

      const user = await this.model.login({ correo, password })
      sessionStorage.setItem("user", JSON.stringify(user))
      window.location.replace("index.html")
    } catch (error) {
      const miAlerta = document.getElementById("alerta")
      document.getElementById("mensaje-alerta").innerHTML = error.message
      miAlerta.style.display = "flex"
      //console.error("Error:", error.message)
    }
  }

  cerrar() {
    const alerta = document.getElementById("alerta")
    alerta.style.display = "none"
  }
}

export { LoginController }
