const sql = require('../models/Usuarios.dao.js');
const { jwtSign } = require('../../utils/jwt.js');

// registrar un usuario
exports.registerUser = function(req, res) {
  sql.createUser(req.body.email, req.body.password, req.body.rol, req.body.lenguage)
    .then(function([user]) {
      res.status(201).json({ id: user.id, email: user.email });
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
};

// recibir credenciales y devolver un token
exports.login = function(req, res) {
  sql.verifyUserCredentials(req.body.email, req.body.password)
    .then(function(user) {
      if (user.length > 0) {
        res.status(200).json({ token: jwtSign({ email: req.body.email }) });
      } else {
        res.status(404).json({ code: 404, message: 'Recurso no encontrado' });
      }
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
};

// devolver los datos de un usuario
exports.returnUser = function(req, res) {
  sql.getUser(req.body.email, req.body.rol, req.body.lenguage)
    .then(function(user) {
      if (user.length > 0) {
        res.status(200).json({ token: jwtSign({ email: req.body.email }) });
      } else {
        res.status(404).json({ code: 404, message: 'Recurso no encontrado' });
      }
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
};
