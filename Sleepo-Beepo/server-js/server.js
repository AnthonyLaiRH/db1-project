const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();
const path = require('path');
const port = 4000;

const db = require('./queries')

require('dotenv').config()

server.use(cors());
server.use(express.static(path.resolve(__dirname, '../website')));

server.use(bodyParser.json())
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

server.get('/', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../website/searchAvailability.html'));
}); 

server.get('/listAll', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../website/listProperty.html'));
});

server.get('/info', (request, response) => {
  response.send();
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});

server.get('/properties', db.getProperties);
server.get('/properties/:max', db.getPropertiesBelowPrice);
server.get('/properties/:date', db.getPropertiesByAvailability);
server.post('/properties', db.addProperty);

