//nesse file iremos iniciar o express
import express from 'express';
//app é uma instancia de express
const app = express();
app.use(express.json());//middleware
//esse app.get recebe 2 parametros o primeiro é uma string, que se refere a url e o segundo parametro é um callback.
const livros = [{
  id: 1,
  title: 'O senhor dos aneis'
}, {
  id: 2,
  title: 'Duna'
},{
  id: 3,
  title: 'gelo & fogo'
}];
const acharLivro = (book, INDEX = false) => {
  if(INDEX) {
    return livros.findIndex(e => e.id === Number(book));
  }
  return livros.find(e => e.id === Number(book));
}
//na maioria das resposta o servidor sempre vai retornar um status code, mensagens e dados, no primeiro get temos tanto o status code "200" e uma mensagem tipo string LINHA: 16.
//no segundo get tbm temos status code porem agr estamos enviando dados formatados em JSON LINHA: 19.
app.get("/", (req, res) => {
  res.status(200).send('Refatorando o server com o framework express');
});

app.get("/livros", (req, res) => res.status(200).json(livros));

app.get("/livros/:id", (req, res) => {
  const achar = acharLivro(req.params.id);
  achar ? res.status(200).json(achar) : res.status(400).send('livro não encontrado, tente novamente!');
});

app.post("/livros", (req, res) => {
  const achar = acharLivro(req.body.id);
  if(!achar) {
    livros.push(req.body);
    res.status(201).send('livro cadastrado com sucesso!');
  } else {
    res.status(400).send(`livro ${req.body.title} ja existe na lista de livros ou id ${req.body.id} ja exista, tente novamente!`);
  }
});

app.put("/livros/:id", (req, res) => {
  const achar = acharLivro(req.params.id, true);
  if(achar === -1) {
    res.status(400).send(`livro não encontrado, tente novamente`);
  } else {
    livros[achar].title = req.body.title;
    res.status(200).json(livros);
  }
});

app.delete("/livros/:id", (req, res) => {
  const achar = acharLivro(req.params.id, true);
  if(achar === -1) {
    res.status(400).send(`livro não encontrado, tente novamente`);
  } else {
    livros.splice(achar, 1);
    res.status(200).send(`livro removido com sucesso!`);
  }
});
export default app;