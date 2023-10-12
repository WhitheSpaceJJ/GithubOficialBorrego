const express = require('express')
const cors = require('cors')
const manejadorErrores = require('../middlewares/manejador-errores')
const sequelize = require('../config/db')
const {
  routerOcupacion,
  routerDemanda,
  routerEstadoProcesal,
  routerProcesoJudicial,
  routerJuzgado,
  routerJuez,
  routerDenuncia,
  routerEscolaridad,
  routerEtnia,
  routerImputado,
  routerParticipante,
  routerPromovente
} = require('../routes')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      ocupacion: '/ocupacion',
      demanda: '/demanda',
      estadoProcesal: '/estado-procesal',
      procesoJudicial: '/proceso-judicial',
      juzgado: '/juzgado',
      juez: '/juez',
      denuncia: '/denuncia',
      escolaridad: '/escolaridad',
      etnia: '/etnia',
      imputado: '/imputado',
      participante: '/participante',
      promovente: '/promovente'
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
    this.app.use(this.paths.demanda, routerDemanda)
    this.app.use(this.paths.estadoProcesal, routerEstadoProcesal)
    this.app.use(this.paths.procesoJudicial, routerProcesoJudicial)
    this.app.use(this.paths.juzgado, routerJuzgado)
    this.app.use(this.paths.juez, routerJuez)
    this.app.use(this.paths.denuncia, routerDenuncia)
    this.app.use(this.paths.escolaridad, routerEscolaridad)
    this.app.use(this.paths.etnia, routerEtnia)
    this.app.use(this.paths.imputado, routerImputado)
    this.app.use(this.paths.participante, routerParticipante)
    this.app.use(this.paths.promovente, routerPromovente)
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`El servidor de demandas está corriendo en el puerto ${process.env.PORT}`)
    })
  }
}

module.exports = Server
