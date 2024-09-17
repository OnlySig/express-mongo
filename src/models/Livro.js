import mongoose from "mongoose";
// import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
  id: { 
    type: mongoose.Schema.Types.ObjectId 
  },
  titulo: { 
    type: String, 
    required: [true, "O campo titulo é obrigatório!"] 
  },
  editora: { 
    type: String,
    required: [true, "O campo editora é obrigatório!"],
    //enum: { values: ["masculino", "feminino"], message: "Exemplo de enum {VALUE}" }
  },
  preco: { 
    type: Number,
    required: [true, "O campo preço é obrigatório!"]
  },
  paginas: { 
    type: Number,
    min: [10, "Valor mínimo de 10 a 9999 páginas, valor {VALUE} inválido!"], //minimo permitido
    max: [9999, "Valor mínimo de 10 a 9999 páginas, valor {VALUE} inválido!"] //maximo permitido
    /*Validações customizadas
    validate: {
      validator: (value) => {
        return value >= 10 && valor <= 9999  
      }
      message: "Valor mínimo de 10 a 9999 páginas, valor {VALUE} inválido!"
    }
    */
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "autores", 
    required: [true, "O campo autor é obrigatório!"]
  },
});

const livro = mongoose.model("livros", livroSchema);

export default livro;