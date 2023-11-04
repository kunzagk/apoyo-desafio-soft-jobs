const sql = require('../models/usuarios.dao.js');
const jwtSign = require('../../utils/jwt.js').jwtSign;
const { encrypt } = require('../../utils/bcrypt.js');

exports.registerUser = function(req, res) {
  const encryptedPassword = encrypt(req.body.password);
  
  sql.createUser(req.body.email, encryptedPassword, req.body.rol, req.body.lenguage)
    .then(function(user) {
      res.status(201).json({ id: user[0].id, email: user[0].email });
    })
    .catch(function(error) {
      res.status(500).json(error);
    });
};

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
