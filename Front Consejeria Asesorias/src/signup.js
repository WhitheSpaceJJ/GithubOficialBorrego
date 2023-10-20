import { SignUpController } from '../controllers/signup.controller'
import { APIModel } from '../models/api.model'
import { SignUpView } from '../views/signup.view'

const main = () => {
  const model = new APIModel()
  const controller = new SignUpController(model)
  // eslint-disable-next-line no-unused-vars
  const view = new SignUpView(controller)
}

main()
