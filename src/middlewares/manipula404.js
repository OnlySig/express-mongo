import NotFound from "../errors/NotFound.js";

function manipula404(req, res, next) {
  const error404 = new NotFound();
  next(error404);
}

export default manipula404;