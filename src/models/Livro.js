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
    required: [true, "O campo editora é obrigatório!"]
  },
  preco: { 
    type: Number,
    required: [true, "O campo preço é obrigatório!"]
  },
  paginas: { 
    type: Number 
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "autores", 
    required: [true, "O campo autor é obrigatório!"]
  },
});

const livro = mongoose.model("livros", livroSchema);

export default livro;