import BadRequest from "./BadRequest.js";

class ValidationError extends BadRequest {
  constructor(erro){
    const msgErro = Object.values(erro.errors)
      .map(e => e.message);
    super(`Erro detectado: ${msgErro}`);
  }
}

export default ValidationError;