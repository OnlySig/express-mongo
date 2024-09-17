import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autorRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res)=>res.status(200).send("Curso de node.js"));
  app.use(express.json(), livros, autores);//middlewares
  //Todo middleware tem acesso à função next, que pode ser utilizada para executar o próximo middleware registrado na aplicação 
  //ou para executar diretamente o manipulador de erros quando recebe um erro como parâmetro.
};

export default routes;