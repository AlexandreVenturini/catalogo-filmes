require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const generosData = require(path.join(__dirname, 'data/generos.json'));
const diretoresData = require(path.join(__dirname, 'data/diretores.json'));
const filmesData = require(path.join(__dirname, 'data/filmes.json'));

const USUARIOS = ['ana_silva', 'carlos99', 'mari_frias', 'joao_k', 'pedro_leal', 'lu_costa', 'fernanda_m', 'rafa_bz', 'thiago_r', 'camila_v'];
const COMENTARIOS = [
  'Uma obra incrível, imperdível.',
  'Roteiro bem construído, recomendo.',
  'Achei um pouco lento no início, mas o final compensa.',
  'Atuações brilhantes do elenco inteiro.',
  'Trilha sonora impecável.',
  'Fotografia deslumbrante.',
  'Me surpreendeu muito, não esperava tanto.',
  'Clássico que nunca envelhece.',
  'Poderia ter sido mais curto, mas vale a pena.',
  'Um dos melhores do gênero.',
];

function gerarAvaliacoes(quantidade) {
  return Array.from({ length: quantidade }, (_, i) => ({
    usuario: USUARIOS[i % USUARIOS.length],
    nota: parseFloat((Math.random() * 4 + 6).toFixed(1)),
    comentario: COMENTARIOS[i % COMENTARIOS.length],
    data: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
  }));
}

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    await db.collection('generos').deleteMany({});
    await db.collection('diretores').deleteMany({});
    await db.collection('filmes').deleteMany({});

    const generos = generosData.map(g => ({ ...g, _id: new ObjectId() }));
    const diretores = diretoresData.map(d => ({ ...d, _id: new ObjectId() }));

    await db.collection('generos').insertMany(generos);
    await db.collection('diretores').insertMany(diretores);

    const generoMap = Object.fromEntries(generos.map(g => [g.nome, g._id]));
    const diretorMap = Object.fromEntries(diretores.map(d => [d.nome, d._id]));

    const filmes = filmesData.map(f => ({
      titulo: f.titulo,
      ano: f.ano,
      duracao_min: f.duracao_min,
      sinopse: f.sinopse,
      diretor_id: diretorMap[f.diretor],
      genero_id: generoMap[f.genero],
      avaliacoes: gerarAvaliacoes(Math.floor(Math.random() * 5) + 4),
    }));

    await db.collection('filmes').insertMany(filmes);

    await db.collection('filmes').createIndex({ titulo: 1 });
    await db.collection('filmes').createIndex({ genero_id: 1 });
    await db.collection('filmes').createIndex({ diretor_id: 1 });
    await db.collection('filmes').createIndex({ ano: -1 });
    await db.collection('generos').createIndex({ nome: 1 });
    await db.collection('diretores').createIndex({ nome: 1 });

    console.log('Banco populado com sucesso.');
    console.log(`Generos inseridos: ${generos.length}`);
    console.log(`Diretores inseridos: ${diretores.length}`);
    console.log(`Filmes inseridos: ${filmes.length}`);
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
