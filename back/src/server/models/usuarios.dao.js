const genericSqlQuery = require('../databases/pg.js');
const { compare } = require('../../utils/bcrypt.js');

const createUser = async (email, password, rol, lenguage) => {
  const encryptedPassword = await encrypt(password);
  return await genericSqlQuery('INSERT INTO usuarios (id, email, password, rol, lenguage) VALUES (DEFAULT ,$1, $2, $3, $4) RETURNING *;', [email, encryptedPassword, rol, lenguage]);
};

const verifyUserCredentials = async (email, password) => {
  const user = await genericSqlQuery('SELECT * FROM usuarios WHERE email = $1;', [email]);
  if (user.length > 0) {
    const match = await compare(password, user[0].password);
    return match ? user : [];
  } else {
    return [];
  }
};

const getUser = async (email, rol, lenguage) => await genericSqlQuery('SELECT * FROM usuarios WHERE email = $1 AND rol AND = $2 lenguage = $3;', [email, rol, lenguage]);

module.exports = { createUser, verifyUserCredentials, getUser };
