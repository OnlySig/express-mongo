
import NotFound from "../errors/NotFound.js";
import { autor } from "../models/Autor.js";
 
class AutorController {
  static async listarAutor(req, res, next) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (error) {
      next(error);
    }
  };
  
  static async listarAutorPorId(req, res, next) {
    try {
      const listaAutores = await autor.findById(req.params.id);
      listaAutores ? 
        res.status(200).json(listaAutores) : 
        next(new NotFound("Autor não localizado - Not Found!"));
    } catch (error) {
      next(error);
    }
  };

  static async cadastrarAutor(req, res, next) {
    try {
      const newAutor = await autor.create(req.body);
      res.status(201).json({ message: "autor criado com sucesso", autor: `${newAutor}` });
    } catch (error) {
      next(error);
    }
  };

  static async atualizarAutorPorId(req, res, next) {
    try {
      await autor.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "autor atualizado com sucesso!"});
    } catch (error) {
      next(error);
    }
  };

  static async deletarAutorPorId(req, res, next) {
    try {
      await autor.findByIdAndDelete(req.params.id, req.body);
      res.status(200).json({ message: "autor deletado com sucesso!" });
    } catch (error) {
      next(error);
    }
  };
}

export default AutorController;