const grpc = require('@grpc/grpc-js')
const { packageDefinition } = require('../grpc/route.sever')
const CustomeError = require('../models/customeError')

const jwtMiddleware = async (req, res, next) => {
  const tokenHeader = req.headers.authorization // Obtener el valor del encabezado "Authorization"
  // Verificar si el token existe en el encabezado
  if (!tokenHeader) {
    const customeError = new CustomeError('Token no proporcionado.', 401)
    next(customeError)
    return
  }

  // Extraer el token del encabezado "Authorization"
  const token = tokenHeader.replace('Bearer ', '') // Quita "Bearer " del encabezado

  const tokenClient = grpc.loadPackageDefinition(packageDefinition).tokenService
  const validador = new tokenClient.TokenService('198.101.238.125:3007', grpc.credentials.createInsecure())

  validador.validarToken({ token }, function (err, response) {
    if (err) {
      const customeError = new CustomeError('Error al validar token', 500)
      return next(customeError)
    }
    if (response.message === 'Token inválido') {
      const customeError = new CustomeError('Token inválido, no ha iniciado sesión.', 401)
      next(customeError)
    } else if (response.message === 'Token válido') {
      next()
    }
  })
}

module.exports = jwtMiddleware
