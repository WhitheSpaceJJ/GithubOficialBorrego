const express = require('express')
const cors = require('cors')
const verify_jwt = require('../middlewares/verify-jwt')
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
  }

  routes () {
    this.app.use(this.paths.ocupacion, verify_jwt, routerOcupacion)
    this.app.use(this.paths.demanda, verify_jwt, routerDemanda)
    this.app.use(this.paths.estadoProcesal, verify_jwt, routerEstadoProcesal)
    this.app.use(this.paths.procesoJudicial, verify_jwt, routerProcesoJudicial)
    this.app.use(this.paths.juzgado, verify_jwt, routerJuzgado)
    this.app.use(this.paths.juez, verify_jwt, routerJuez)
    this.app.use(this.paths.denuncia, verify_jwt, routerDenuncia)
    this.app.use(this.paths.escolaridad, verify_jwt, routerEscolaridad)
    this.app.use(this.paths.etnia, verify_jwt, routerEtnia)
    this.app.use(this.paths.imputado, verify_jwt, routerImputado)
    this.app.use(this.paths.participante, verify_jwt, routerParticipante)
    this.app.use(this.paths.promovente, verify_jwt, routerPromovente)
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`El servidor de demandas está corriendo en el puerto ${process.env.PORT}`)
    })
  }
}

module.exports = Server
