import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes
  .get("/livros", LivroController.listarLivros, paginar)
  .get("/livros/search", LivroController.listarLivrosPorFiltro, paginar)
  .get("/livros/:id", LivroController.listarUmLivroPorId)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivroPorId)
  .delete("/livros/:id", LivroController.deletaLivro);

export default routes;