const fs = require('fs');
const path = require('path');
let dotenv;
try {
  dotenv = require('dotenv');
} catch (err) {
  console.warn(
    "The 'dotenv' module is not installed. Skipping .env file loading. " +
      'Run `npm install` if you wish to use environment files.'
  );
}

// Load environment variables from .env if present. Fall back to .env.example so
// the application can run out of the box (useful for environments like Replit).
if (dotenv) {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  } else {
    const exampleEnv = path.resolve(process.cwd(), '.env.example');
    if (fs.existsSync(exampleEnv)) {
      dotenv.config({ path: exampleEnv });
      console.warn('Warning: .env file not found. Loaded variables from .env.example');
    }
  }
} else {
  console.warn('Environment variables will be read from the process only.');
}

let CubejsServer;
try {
  CubejsServer = require('@cubejs-backend/server');
} catch (err) {
  console.error(
    "Dependencies are missing. Please run `npm install` before starting the server."
  );
  process.exit(1);
}

if (!process.env.CUBEJS_DB_TYPE) {
  console.error(
    'Missing CUBEJS_DB_TYPE environment variable. ' +
      'Check your .env configuration or create one based on .env.example.'
  );
  process.exit(1);
}

const server = new CubejsServer();

server.listen().then(({ version, port }) => {
  console.log(`🚀 Cube.js server (${version}) is running on port ${port}`);
});
