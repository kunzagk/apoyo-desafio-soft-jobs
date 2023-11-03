const dotenv = require('dotenv');
dotenv.config();

const genericSqlQuery = require('../databases/pg.js');

exports.createUser = async function (email, password, rol, lenguage) {
  return await genericSqlQuery('INSERT INTO usuarios (id, email, password, rol, lenguage) VALUES (DEFAULT ,$1, $2, $3, $4) RETURNING *;', [email, password, rol, lenguage]);
};

exports.verifyUserCredentials = async function (email, password) {
  return await genericSqlQuery('SELECT * FROM usuarios WHERE email = $1 AND password = $2;', [email, password]);
};

exports.getUser = async function (email, rol, lenguage) {
  return await genericSqlQuery('SELECT * FROM usuarios WHERE email = $1 AND rol = $2 AND lenguage = $3;', [email, rol, lenguage]);
};
