function enviarRecuperacion(event) {
  event.preventDefault()

  const correo = document.getElementById('correo').value
  const url2 = `http://localhost:3002/usuarios/recuperacion?correo=${correo}`
  fetch(url2, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Error en la petición')
      }
    })
    .then(data => {
      const miAlerta2 = document.getElementById('alerta-recuperada')
      miAlerta2.style.display = 'flex'
    })
    .catch(error => {
      const miAlerta = document.getElementById('alerta')
      miAlerta.style.display = 'flex'
      console.error('Error de conexión:', error)
    })
}

function cerrar() {
  const alerta = document.getElementById('alerta')
  alerta.style.display = 'none'
}

function aceptar() {
  const alerta = document.getElementById('alerta-recuperada')
  alerta.style.display = 'none'
  window.location.href = `login.html`
}

document
  .getElementById('recuperar')
  .addEventListener('submit', enviarRecuperacion)
