import { BusquedaTurnarController } from '../controllers/busqueda-turnar.controller'
import { APIModel } from '../models/api.model'
import { BusquedaTurnarView } from '../views/busqueda-turnar.view'

const main = () => {
  const model = new APIModel()
  const controller = new BusquedaTurnarController(model)
  // eslint-disable-next-line no-unused-vars
  const view = new BusquedaTurnarView(controller)
}

main()
