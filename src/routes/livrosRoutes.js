import express from 'express';
import LivroController from '../controllers/livroController.js';

const routes = express.Router();

routes.get("/livros/:id", LivroController.listarUmLivroPorId);
routes.get("/livros", LivroController.listarLivros);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivroPorId);
routes.delete("/livros/:id", LivroController.deletaLivro);

export default routes;