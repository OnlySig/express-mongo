//nesse file iremos iniciar o express
import express from "express";
import connectarNoDb from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await connectarNoDb();
conexao.on("error", (error) => {
  console.error("Erro de conexão: ", error);
});

conexao.once("open", () => {
  console.log("Conexão com o mongoDb feita com sucesso!");
});

const app = express();
routes(app);
//app é uma instancia de express
// as rotas foram para a pasta routes
export default app;