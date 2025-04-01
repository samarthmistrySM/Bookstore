import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Bookstore API',
        description: 'Description'
    },
    host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen()(outputFile, routes, doc);
