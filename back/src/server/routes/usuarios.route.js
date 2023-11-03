const express = require('express');
const usuarios = require('../controllers/usuarios.controller.js');

const router = express.Router();

router.post('/usuarios', usuarios.registerUser);
router.post('/login', usuarios.login);
router.get('/usuarios', usuarios.returnUser);

module.exports = router;
