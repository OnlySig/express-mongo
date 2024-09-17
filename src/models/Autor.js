import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  nome: {
    type: String,
    required: [true, "O nome do autor(a) é obrigatório!"], // o segundo parâmetro vai ser uma mensagem de erro personalizada!
  },
  nacionalidade: {
    type: String
  },
}, {
  versionKey: false
});

const autor = mongoose.model("autores", autorSchema);

export default autor;