const grpc = require('@grpc/grpc-js')
const { packageDefinition } = require('../grpc/route.sever')

const jwtMiddleware = async (req, res, next) => {
  const tokenHeader = req.headers.authorization // Obtener el valor del encabezado "Authorization"
  // Verificar si el token existe en el encabezado
  if (!tokenHeader) {
    return res.status(401).json({
      message: 'Token no proporcionado.'
    })
  }

  // Extraer el token del encabezado "Authorization"
  const token = tokenHeader.replace('Bearer ', '') // Quita "Bearer " del encabezado

  const tokenClient = grpc.loadPackageDefinition(packageDefinition).tokenService
  const validador = new tokenClient.TokenService('198.101.238.125:3007', grpc.credentials.createInsecure())

  validador.validarToken({ token }, function (err, response) {
    if (err) {
      return res.status(500).json({
        message: 'Error al validar token'
      })
    }
    if (response.message === 'Token inválido') {
      res.status(401).json({
        message: 'Token inválido, no ha iniciado sesión.'
      })
    } else if (response.message === 'Token válido') {
      next()
    }
  })
}

module.exports = jwtMiddleware
