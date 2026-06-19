const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

function collection() {
  return getDB().collection('filmes');
}

async function inserirUm(dados) {
  const resultado = await collection().insertOne(dados);
  return resultado;
}

async function inserirVarios(lista) {
  const resultado = await collection().insertMany(lista);
  return resultado;
}

async function buscarPorId(id) {
  return collection().findOne({ _id: new ObjectId(id) });
}

async function buscarTodos(filtro = {}, projecao = {}) {
  return collection().find(filtro, { projection: projecao }).toArray();
}

async function atualizarPorId(id, campos) {
  return collection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: campos },
    { returnDocument: 'after' }
  );
}

async function adicionarAvaliacao(id, avaliacao) {
  return collection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $push: { avaliacoes: avaliacao } },
    { returnDocument: 'after' }
  );
}

async function removerPorId(id) {
  return collection().findOneAndDelete({ _id: new ObjectId(id) });
}

async function removerComFiltro(filtro) {
  return collection().deleteMany(filtro);
}

module.exports = {
  inserirUm,
  inserirVarios,
  buscarPorId,
  buscarTodos,
  atualizarPorId,
  adicionarAvaliacao,
  removerPorId,
  removerComFiltro,
};
