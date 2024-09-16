import { ObjectId } from "mongodb";
import { autor } from "../models/Autor.js";
 
class AutorController {
  static async listarAutor(req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao carregar autores!` });
    }
  };
  
  static async listarAutorPorId(req, res) {
    try {
      if(!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "ID inválido!" });
      const listaAutores = await autor.findById(req.params.id);
      listaAutores ? 
        res.status(200).json(listaAutores) : 
        res.status(404).json({ message: "Autor não localizado" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao carregar autor!` });
    }
  };

  static async cadastrarAutor(req, res) {
    try {
      const newAutor = await autor.create(req.body);
      res.status(201).json({ message: "autor criado com sucesso", autor: `${newAutor}` });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao criar autor!` });
    }
  };

  static async atualizarAutorPorId(req, res) {
    try {
      await autor.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "autor atualizado com sucesso!"});
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao atualizar autor!` });
    }
  };

  static async deletarAutorPorId(req, res) {
    try {
      await autor.findByIdAndDelete(req.params.id, req.body);
      res.status(200).json({ message: "autor deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao deletar autor!` });
    }
  };
}

export default AutorController;