import ErroBase from "./ErroBase.js";

class NotFound extends ErroBase {
  constructor(msg = "Página não encontrada") {
    super(msg, 404);
  }
}

export default NotFound;