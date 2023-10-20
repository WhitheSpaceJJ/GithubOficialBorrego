import { TurnarController } from '../controllers/turnar.controller'
import { APIModel } from '../models/api.model'
import { TurnarView } from '../views/turnar.view'

const main = () => {
  const model = new APIModel()
  const controller = new TurnarController(model)
  // eslint-disable-next-line no-unused-vars
  const view = new TurnarView(controller)
}

main()
