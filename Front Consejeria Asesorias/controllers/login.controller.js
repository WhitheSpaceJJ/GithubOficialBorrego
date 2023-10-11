class LoginController {
  constructor(model) {
    this.model = model
  }

  //Methods
  handleLogin = async () => {
    const correo = document.getElementById("correo").value
    const password = document.getElementById("password").value
    try {
      const user = await this.model.login(correo, password)
      sessionStorage.setItem("user", JSON.stringify(user))
      window.location.replace("index.html")
    } catch (error) {
      const miAlerta = document.getElementById("alerta")
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
