const express = require('express');
const { createUser } = require('../controllers/userController');
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('welcome user');
});
routes.post('/register', createUser);

module.exports = routes;
