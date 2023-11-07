import '../components/modal-warning/modal-warning.js'

class SignUpView {
  constructor(controller) {
    this.controller = controller
    this.signupForm = document.getElementById('signup')

    document.addEventListener(
      'DOMContentLoaded',
      this.controller.handleDOMContentLoaded()
    )

    this.signupForm.addEventListener('submit', e => {
      e.preventDefault()
      this.controller.handleSignup()
    })
  }
}

export { SignUpView }
