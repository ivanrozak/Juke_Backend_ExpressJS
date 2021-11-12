const express = require('express');
var cors = require('cors');
require('dotenv').config();
const routesNavigation = require('./src/routesNavigation');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/files', express.static('uploads'));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  );
  next();
});
app.use('/', routesNavigation);

app.get('*', (request, response) => {
  response.status(404).send('Path not found !');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
