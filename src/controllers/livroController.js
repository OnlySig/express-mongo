import { livro } from "../models/index.js";
import { notfoundControllers, processaBusca } from "./index.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();
      req.resultado = buscaLivros;
      next();
    } catch (error) {
      next(error);
    }
  };

  static async listarUmLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const findLivro = await livro.findById(id)
        .populate("autor")
        .exec();
      notfoundControllers(findLivro, res, next);
    } catch (error) {
      next(error);
    }
  };

  static async atualizarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const findPut = await livro.findByIdAndUpdate(id, {$set: req.body});
      notfoundControllers(findPut, res, next, "Livro atualizado com sucesso!");
    } catch (error) {
      next(error);
    }
  };

  static async cadastrarLivro(req, res, next) {
    //const newLivro = req.body;
    try {
      //const autorEncontrado = await autor.findById(newLivro.autor);
      //const livroTotal = await livro.create({...newLivro, autor: {...autorEncontrado._doc}});
      const newLivro = new livro(req.body);
      const livroResult = await newLivro.save();
      res.status(201).json(livroResult);
    } catch (error) {
      next(error);
    }
  };

  static async deletaLivro(req, res, next) {
    try {
      const id = req.params.id;
      const dellLivros = await livro.findByIdAndDelete(id);
      notfoundControllers(dellLivros, res, next, "livro deletado com sucesso!");
    } catch (error) {
      next(error);
    }
  }

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);
      if(!busca) return res.status(200).json([]);
      const livrosResult = livro.find(busca)
        .populate("autor");
      req.resultado = livrosResult;
      next();
    } catch (error) {
      next(error);
    }
  }
};

export default LivroController;