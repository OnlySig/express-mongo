import NotFound from "../errors/NotFound.js";
import { livro } from "../models/index.js";

function notfoundLivro(livro, res, next, msgFound, msgNotfound = "Livro não localizado!") {
  livro === null || livro.length === 0 ? 
    next(new NotFound(msgNotfound)) : 
    msgFound ? res.status(200).json({message: msgFound}) :
      res.status(200).json(livro);
}

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
      notfoundLivro(findLivro, res, next);
    } catch (error) {
      next(error);
    }
  };

  static async atualizarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const findPut = await livro.findByIdAndUpdate(id, {$set: req.body});
      notfoundLivro(findPut, res, next, "Livro atualizado com sucesso!");
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
      notfoundLivro(dellLivros, res, next, "livro deletado com sucesso!");
    } catch (error) {
      next(error);
    }
  }

  static async listarLivrosPorEditora(req, res, next) {
    const editora = req.query.editora;
    try {
      const livrosEditora = await livro.find({editora});
      notfoundLivro(livrosEditora, res, next, null, `Não foi possivel encontrar livros da editora: ${editora} `);
    } catch (error) {
      next(error);
    }
  }
};

export default LivroController;