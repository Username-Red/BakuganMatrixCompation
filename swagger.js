const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Bakugan Matrix Companion API',
    description: 'API for managing Bakugan collections, decks, and maybe battles.',
  },
  host: 'bakuganmatrixcompation.onrender.com/api-docs/',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
