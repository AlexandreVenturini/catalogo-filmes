const { getDB } = require('../config/db');

function collection() {
  return getDB().collection('filmes');
}

async function mediaAvaliacoesPorFilme() {
  return collection().aggregate([
    { $match: { 'avaliacoes.0': { $exists: true } } },
    { $unwind: '$avaliacoes' },
    {
      $group: {
        _id: '$_id',
        titulo: { $first: '$titulo' },
        ano: { $first: '$ano' },
        media_nota: { $avg: '$avaliacoes.nota' },
        total_avaliacoes: { $sum: 1 },
      },
    },
    { $sort: { media_nota: -1 } },
  ]).toArray();
}

async function top5FilmesPorNota() {
  return collection().aggregate([
    { $match: { 'avaliacoes.0': { $exists: true } } },
    { $unwind: '$avaliacoes' },
    {
      $group: {
        _id: '$_id',
        titulo: { $first: '$titulo' },
        ano: { $first: '$ano' },
        media_nota: { $avg: '$avaliacoes.nota' },
        total_avaliacoes: { $count: {} },
      },
    },
    { $sort: { media_nota: -1 } },
    { $limit: 5 },
  ]).toArray();
}

async function filmesPorDiretor() {
  return collection().aggregate([
    {
      $lookup: {
        from: 'diretores',
        localField: 'diretor_id',
        foreignField: '_id',
        as: 'diretor',
      },
    },
    { $unwind: '$diretor' },
    {
      $group: {
        _id: '$diretor._id',
        diretor: { $first: '$diretor.nome' },
        nacionalidade: { $first: '$diretor.nacionalidade' },
        total_filmes: { $sum: 1 },
        filmes: { $push: '$titulo' },
      },
    },
    { $sort: { total_filmes: -1 } },
  ]).toArray();
}

async function distribuicaoPorGenero() {
  return collection().aggregate([
    {
      $lookup: {
        from: 'generos',
        localField: 'genero_id',
        foreignField: '_id',
        as: 'genero',
      },
    },
    { $unwind: '$genero' },
    {
      $group: {
        _id: '$genero._id',
        genero: { $first: '$genero.nome' },
        total_filmes: { $sum: 1 },
        media_duracao: { $avg: '$duracao_min' },
        filmes: { $push: '$titulo' },
      },
    },
    {
      $project: {
        _id: 0,
        genero: 1,
        total_filmes: 1,
        media_duracao: { $round: ['$media_duracao', 0] },
        filmes: 1,
      },
    },
    { $sort: { total_filmes: -1 } },
  ]).toArray();
}

module.exports = {
  mediaAvaliacoesPorFilme,
  top5FilmesPorNota,
  filmesPorDiretor,
  distribuicaoPorGenero,
};
