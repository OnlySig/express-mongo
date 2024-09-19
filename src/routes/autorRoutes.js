import express from "express";
import AutorController from "../controllers/autorController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router.get("/autores", AutorController.listarAutor, paginar)
  .get("/autores/search", AutorController.buscaAutorPorFiltro, paginar)
  .get("/autores/:id", AutorController.listarAutorPorId)
  .post("/autores", AutorController.cadastrarAutor)
  .put("/autores/:id", AutorController.atualizarAutorPorId)
  .delete("/autores/:id", AutorController.deletarAutorPorId);

export default router;