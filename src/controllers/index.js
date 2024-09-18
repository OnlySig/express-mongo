import NotFound from "../errors/NotFound.js";
import autor from "../models/Autor.js";

export async function processaBusca(params){
  const { editora, titulo, pages_min, pages_max, preco_min, preco_max, nomeAutor } = params;
  const busca = {};
  if(editora) busca.editora = newRegExp(editora);
  if(titulo) busca.titulo = newRegExp(titulo);

  if(nomeAutor) {
    const regexAutor = newRegExp(nomeAutor);
    const findAutor = await autor.findOne({nome: regexAutor});
    if(!findAutor) return;
    busca.autor = findAutor._id;
  }
  //tbm é possivel fazer dessa forma: busca.titulo = { $regex: titulo, $options: "i" }; esse metodo é usando o mongoose, contudo usei metodo JS pra isso.
  //gte = Greater than or Equal ---- lte = Less than or Equal
  //if(pages_min) busca.paginas = {$gte: pages_min} não podemos fazer dessa forma pois se for passado os 2 parâmetros eles irão se sobre-escrever, para isso não acontecer;
  //tem quer ser usado dessa forma: if(pages_min) busca.paginas.$gte = pages_min, POREM antes disso, para não dar erro temos que iniciar a propriedade selecionada, paginas ou preco;
  if(pages_min || pages_max) busca.paginas = {};
  if(preco_min || preco_max) busca.preco = {};
  
  if(pages_min) busca.paginas.$gte = pages_min;
  if(pages_max) busca.paginas.$lte = pages_max;
  
  if(preco_min) busca.preco.$gte = preco_min;
  if(preco_max) busca.preco.$lte = preco_max;
  return busca;
}

export function notfoundControllers(livro, res, next, msgFound, msgNotfound = "Livro não localizado!") {
  livro === null || livro.length === 0 ? 
    next(new NotFound(msgNotfound)) : 
    msgFound ? res.status(200).json({message: msgFound}) :
      res.status(200).json(livro);
}

export function newRegExp(msg) {
  const regex = new RegExp(msg, "i");
  return regex;
}