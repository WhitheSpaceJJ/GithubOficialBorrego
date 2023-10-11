const express = require('express')
const cors = require('cors')
const manejadorErrores = require('../middlewares/manejador-errores')
const sequelize = require('../config/db')
const routerOcupacion = require('../routes/ocupacion')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      ocupacion: '/ocupacion'
    }
    this.middlewares()
    this.conectarBD()
    this.routes()
  }

  async conectarBD () {
    await sequelize.sync()
  }

  middlewares () {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(manejadorErrores)
  }

  routes () {
    this.app.use(this.paths.ocupacion, routerOcupacion)
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`El servidor de demandas está corriendo en el puerto ${process.env.PORT}`)
    })
  }
}

module.exports = Server
