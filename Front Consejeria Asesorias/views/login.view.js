class LoginView {
  constructor(controller) {
    this.controller = controller

    // Obtén los elementos de los botones
    this.loginForm = document.getElementById("login")
    this.btnCloseAlerta = document.getElementById("btn-close-alerta")

    // Agrega manejadores de eventos
    this.loginForm.addEventListener("submit", e => {
      e.preventDefault()
      this.controller.handleLogin()
    })
    this.btnCloseAlerta.addEventListener(
      "click",
      this.controller.cerrar.bind(this.controller)
    )
  }
}

export { LoginView }
