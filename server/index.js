const express = require('express');
const app = express(); // create express app
var bodyParser = require('body-parser');

let images = [];

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/create', (req, res) => {
  images.push(req.body.data);
  res.send(JSON.stringify({ data: 'success' }));
});

app.get('/', (req, res) => {
  res.send(JSON.stringify({ images: images }));
});

// start express server on port 5000
app.listen(3001, () => {
  console.log('server started on port 3001');
});
