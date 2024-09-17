import ErroBase from "./ErroBase.js";

class BadRequest extends ErroBase {
  constructor(msg = "Os dados fornecidos estão incorretos!") {
    super(msg, 400);
  }
}

export default BadRequest;