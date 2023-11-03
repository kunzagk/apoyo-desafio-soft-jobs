require('dotenv/config');
const express = require('express');
const cors = require('cors');
const routes = require('./routes/index.js');
const forRoutes = require('./middlewares/index.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(forRoutes);

app.use(routes.usuarios);

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'Resource not found' }));

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

module.exports = app;
