require('dotenv').config();
const CubejsServer = require('@cubejs-backend/server');

const server = CubejsServer.create();

server.listen().then(({ version, port }) => {
  console.log(`🚀 Cube.js server (${version}) is running on port ${port}`);
});
