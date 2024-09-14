import express from 'express';
import AutorController from '../controllers/autorController.js';

const router = express.Router();

router.get("/autores", AutorController.listarAutor);
router.get("/autores/:id", AutorController.listarAutorPorId);
router.post("/autores", AutorController.cadastrarAutor);
router.put("/autores/:id", AutorController.atualizarAutorPorId);
router.delete("/autores/:id", AutorController.deletarAutorPorId);

export default router;