const express = require('express');
const {
  createUser,
  loginUser,
  deleteUser,
} = require('../controllers/userController');
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('welcome user');
});
routes.post('/register', createUser);
routes.post('/login', loginUser);
routes.delete('/user', deleteUser);

module.exports = routes;
