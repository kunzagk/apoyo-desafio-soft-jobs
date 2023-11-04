const bcrypt = require('bcryptjs');

const encrypt = (password) => bcrypt.hashSync(password);

const compare = (password, pass) => bcrypt.compareSync(password, pass);

module.exports = { encrypt, compare };
