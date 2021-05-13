const jsonServer = require( 'json-server' );
const server = jsonServer.create();
const router = jsonServer.router( 'mock-server/mock.json' );
const middlewares = jsonServer.defaults();
const db = require( './mock.json' );
const fs = require( 'fs' );

server.use( middlewares );
server.use( jsonServer.bodyParser );

server.post( '/applications', (req, res) => {
  res.status(201).send({
    message: "Application submitted successfully"
  })
} );

server.use( '/products', (req, res, next) => {
  const products = readProducts();
  res.send(products);
} );

server.use( router );
server.listen( 3000, () => {
  console.log( 'Mock API Server is running' );
} );

function readProducts() {
  const dbRaw = fs.readFileSync( './mock-server/mock.json' );
  return JSON.parse( dbRaw ).products;
}
