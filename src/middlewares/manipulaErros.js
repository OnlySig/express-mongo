import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase.js";
import BadRequest from "../errors/BadRequest.js";
import ValidationError from "../errors/validationErro.js";
import NotFound from "../errors/NotFound.js";

// eslint-disable-next-line no-unused-vars
export default function manipulaErros(erro, req, res, next) {
  if(erro instanceof mongoose.Error.CastError) {
    new BadRequest().enviarResposta(res);
  } else if(erro instanceof mongoose.Error.ValidationError) {
    new ValidationError(erro).enviarResposta(res);
  } else if(erro instanceof NotFound) {
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
};