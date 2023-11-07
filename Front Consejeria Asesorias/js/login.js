function ingresar(event) {
  event.preventDefault()

  const usuario = document.getElementById('usuario').value
  const contrasena = document.getElementById('contrasena').value
  const url = `http://localhost:3002/usuarios/usuario?correo=${usuario}&password=${contrasena}`

  fetch(url, {
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
      sessionStorage.setItem('user', JSON.stringify(data))
      /* window.location.href = `menu.html?data=${encodedData}`; */
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

document.getElementById('login').addEventListener('submit', ingresar)
