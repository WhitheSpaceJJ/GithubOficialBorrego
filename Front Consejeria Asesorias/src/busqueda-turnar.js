import { BusquedaTurnar } from "../controllers/busqueda-turnar.controller"
import { APIModel } from "../models/api.model"
import { BusquedaTurnarView } from "../views/busqueda-turnar.view"

const main = () => {
  const model = new APIModel()
  const controller = new BusquedaTurnar(model)
  const view = new BusquedaTurnarView(controller)
}

main()
