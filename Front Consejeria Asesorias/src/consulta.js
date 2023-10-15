import { ConsultaController } from '../controllers/consulta.controller'
import { APIModel } from '../models/api.model'
import { ConsultaView } from '../views/consulta.view'

const main = () => {
  const model = new APIModel()
  const controller = new ConsultaController(model)
  // eslint-disable-next-line no-unused-vars
  const view = new ConsultaView(controller)
}

main()
