const { MongoClient } = require('mongodb');

let db;

async function connectDB() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log(`Conectado ao MongoDB: ${process.env.DB_NAME}`);
  return db;
}

function getDB() {
  if (!db) throw new Error('Banco não inicializado. Chame connectDB primeiro.');
  return db;
}

module.exports = { connectDB, getDB };
