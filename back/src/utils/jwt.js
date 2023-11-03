require('dotenv/config');
const jwt = require('jsonwebtoken');

const KEY = process.env.JWT_SECRET_KEY;

exports.jwtVerify = (token) => jwt.verify(token, KEY);

exports.jwtSign = (payload) => jwt.sign(payload, KEY, { expiresIn: 60 * 5 });
