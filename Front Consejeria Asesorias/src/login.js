import { LoginController } from "../controllers/login.controller.js"
import { APIModel } from "../models/api.model.js"
import { LoginView } from "../views/login.view.js"

const main = () => {
  const model = new APIModel()
  const controller = new LoginController(model)
  const view = new LoginView(controller)
}

main()
