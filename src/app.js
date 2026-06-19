require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');

const filmeRoutes = require('./routes/filme.routes');
const diretorRoutes = require('./routes/diretor.routes');
const generoRoutes = require('./routes/genero.routes');

const app = express();
app.use(express.json());

async function start() {
  await connectDB();

  app.use('/filmes', filmeRoutes);
  app.use('/diretores', diretorRoutes);
  app.use('/generos', generoRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

start();
