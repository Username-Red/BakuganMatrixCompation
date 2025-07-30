const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Bakugan Matrix Companion API',
    description: 'API for managing Bakugan collections, decks, and maybe battles.',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
