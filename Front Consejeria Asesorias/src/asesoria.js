import { AsesoriaController } from '../controllers/asesoria.controller'
import { APIModel } from '../models/api.model'
import { AsesoriaView } from '../views/asesoria.view'

const main = () => {
  const model = new APIModel()
  const controller = new AsesoriaController(model)
  // eslint-disable-next-line no-unused-vars
  const view = new AsesoriaView(controller)
}

main()
