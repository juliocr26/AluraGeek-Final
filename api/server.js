const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}))

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

// Ruta para crear un nuevo producto
server.post("/productos", (req, res) => {
  const nuevoProducto = req.body;
  router.db.get("productos").push(nuevoProducto).write();
  res.send(nuevoProducto);
});

// Ruta para obtener todos los productos
server.get("/productos", (req, res) => {
  const productos = router.db.get("productos").value();
  res.send(productos);
});

// Ruta para actualizar un producto por su ID
server.put("/productos/:id", (req, res) => {
  const idProducto = req.params.id;
  const newData = req.body;
  router.db.get("productos").find({ id: idProducto }).assign(newData).write();
  res.sendStatus(200);
});

// Ruta para eliminar un producto por su ID
server.delete("/productos/:id", (req, res) => {
  const idProducto = req.params.id;
  router.db.get("productos").remove({ id: idProducto }).write();
  res.sendStatus(200);
});

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
