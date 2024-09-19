import { autor } from "../models/index.js";
import { notfoundControllers, processaBusca } from "./index.js";

class AutorController {
  static async listarAutor(req, res, next) {
    try {
      const listaAutores = autor.find();
      req.resultado = listaAutores;
      //console.log(listaAutores);
      next();
    } catch (error) {
      next(error);
    }
  };
  
  static async listarAutorPorId(req, res, next) {
    try {
      const listaAutores = await autor.findById(req.params.id);
      notfoundControllers(listaAutores, res, next, null, "Autor não localizado!");
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
      const putAutor = await autor.findByIdAndUpdate(req.params.id, req.body);
      notfoundControllers(putAutor, res, next, "autor atualizado com sucesso!", "autor não localizado!");
    } catch (error) {
      next(error);
    }
  };

  static async deletarAutorPorId(req, res, next) {
    try {
      const dellAutor = await autor.findByIdAndDelete(req.params.id, req.body);
      notfoundControllers(dellAutor, res, next, "autor deletado com sucesso!", "autor não localizado!");
    } catch (error) {
      next(error);
    }
  };

  static async buscaAutorPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);
      if(!busca) return res.status(200).json([]);
      const findAutor = autor.find(busca);
      req.resultado = findAutor;
      next();
    } catch (error) {
      next(error);
    }
  }
};

export default AutorController;