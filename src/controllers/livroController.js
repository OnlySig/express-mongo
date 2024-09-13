import livro from "../models/Livro.js";

class LivroController {
  
  static async listarLivros(req, res) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao carregar livros!` });
    }
  };

  static async listarUmLivroPorId(req, res) {
    try {
      const id = req.params.id;
      const findLivro = await livro.findById(id);
      res.status(200).json(findLivro);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao carregar livro!` });
    }
  };

  static async atualizarLivroPorId(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "livro atualizado!" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha na atualização!` });
    }
  };

  static async cadastrarLivro(req, res) {
    try {
      const newLivro = await livro.create(req.body);
      res.status(201).json({ message: "livro criado com sucesso!", livro: newLivro});
    } catch (error) {
      res.status(500).json({ message: `${error.message} - FALHA ao cadastra livro!` });
    }
  };

  static async deletaLivro(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id)
      res.status(200).json({ message: "livro deletado" })
    } catch (error) {
      res.status(200).json({ message: `${error.message} - FALHA ao deletar livro!` })
    }
  }
};

export default LivroController;