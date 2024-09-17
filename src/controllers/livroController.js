//import { autor } from "../models/Autor.js";
import NotFound from "../errors/NotFound.js";
import livro from "../models/Livro.js";

class LivroController {
  
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find()
        .populate("autor")
        .exec();
      res.status(200).json(listaLivros);
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
      if(!findLivro) {
        return next(new NotFound("Livro não localizado - Not Found!"));
      }
      res.status(200).json(findLivro);
    } catch (error) {
      next(error);
    }
  };

  static async atualizarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).json({ message: "livro atualizado!" });
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
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "livro deletado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async listarLivrosPorEditora(req, res, next) {
    const editora = req.query.editora;
    try {
      const livrosEditora = await livro.find({editora});
      res.status(200).json(livrosEditora);
    } catch (error) {
      next(error);
    }
  }
};

export default LivroController;