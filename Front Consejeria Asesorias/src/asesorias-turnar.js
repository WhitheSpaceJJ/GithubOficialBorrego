import { AsesoriasTurnarController } from '../controllers/asesorias-turnar.controller'
import { APIModel } from '../models/api.model'
import { AsesoriasTurnarView } from '../views/asesorias-turnar.view'

const main = () => {
  const model = new APIModel()
  const controller = new AsesoriasTurnarController(model)
  // eslint-disable-next-line no-unused-vars
  const view = new AsesoriasTurnarView(controller)
}

main()
