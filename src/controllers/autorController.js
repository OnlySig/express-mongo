import { autor } from "../models/index.js";
import { newRegExp, notfoundControllers } from "./index.js";

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
      const { nacionalidade, nome } = req.query;
      const busca = {};
      nacionalidade ? busca.nacionalidade = newRegExp(nacionalidade) : null;
      nome ? busca.nome = newRegExp(nome) : null;
      const findAutor = await autor.find(busca);
      notfoundControllers(findAutor, res, next, null, "autor não encontrado");
    } catch (error) {
      next(error);
    }
  }
};

export default AutorController;