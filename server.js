// import http from 'http';
import app from './src/app.js';
const PORT = 3000;

// não precisamos mais usar o http pois agr estamos usando o file app que está criando o servidor com o framework express!
// const server = http.createServer((req, res)=>{
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end(rotas[req.url]);
// });

app.listen(PORT, ()=>{
  console.log(`meu primeiro server local em Node escutando na porta: ${PORT}`);
});