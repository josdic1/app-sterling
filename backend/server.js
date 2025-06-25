// server.js (Optional, but good practice if you use routes.json or middleware)
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const customRoutes = require('./routes.json'); // Load your custom routes

// Use default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.use(jsonServer.rewriter(customRoutes));

// Use JSON Server router
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
