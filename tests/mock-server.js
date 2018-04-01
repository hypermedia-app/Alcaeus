const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults({
  static: 'tests/test-objects'
});

server.use((req, res, next) => {
  res.header('content-type', 'application/ld+json');
  next();
});
server.use(middlewares);
server.listen(8080, () => {
  console.log('JSON Server is running')
});
