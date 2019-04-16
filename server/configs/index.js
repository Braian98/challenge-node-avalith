// Port
process.env.PORT  = process.env.PORT || 3000;

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// String Connection
const stringConnection = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost:27017/challenge-node' : process.env.MONGO_URI;

process.env.URLDB = stringConnection;

// Token expiration
process.env.TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '24h';

// SEED token
process.env.SEED = process.env.SEED || 'secret';