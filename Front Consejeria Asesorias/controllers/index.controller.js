import { ControllerUtils } from "../lib/controllerUtils"

class IndexController {
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
  }

  //DOMContentLoaded
  handleDOMContentLoaded = () => {
    //add permissions
    if (this.utils.validatePermissions({})) {
    }
  }
}

export { IndexController }
