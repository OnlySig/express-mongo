import BadRequest from "../errors/BadRequest.js";

export default async function paginar(req, res, next) {
  try {
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
    let [orderBy, order] = ordenacao.split(":"); // destruturação da string de ordernation
    limite = parseInt(limite);
    pagina = parseInt(pagina);
    order = parseInt(order);
    const resultado = req.resultado;
    console.log();
    if(limite <= 0 || pagina <= 0) return next(new BadRequest("ERRO na paginação, tente novamente!"));
    const resultadoPaginado = await resultado.find()
      .sort({ [orderBy]: order }) // ordenação dependendo do parâmetro, aqui seria um orderBy titulo ASC / Sets the sort order. If an object is passed, values allowed are asc, desc, ascending, descending, 1, and -1.
      .skip((pagina - 1) * limite) // literalmente passa os itens ; Specifies the number of documents to skip.
      .limit(limite) // Specifies the maximum number of documents the query will return.
      .populate(resultado._collection.collectionName !== "autores" ? "autor" : null)
      .exec();
    res.status(200).json(resultadoPaginado);
  } catch (error) {
    next(error);
  }
}