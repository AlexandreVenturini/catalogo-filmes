const service = require('../services/agregacao.service');

async function mediaAvaliacoesPorFilme(req, res) {
  try {
    const dados = await service.mediaAvaliacoesPorFilme();
    res.status(200).json({ sucesso: true, total: dados.length, dados });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

async function top5FilmesPorNota(req, res) {
  try {
    const dados = await service.top5FilmesPorNota();
    res.status(200).json({ sucesso: true, dados });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

async function filmesPorDiretor(req, res) {
  try {
    const dados = await service.filmesPorDiretor();
    res.status(200).json({ sucesso: true, total: dados.length, dados });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

async function distribuicaoPorGenero(req, res) {
  try {
    const dados = await service.distribuicaoPorGenero();
    res.status(200).json({ sucesso: true, total: dados.length, dados });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

module.exports = {
  mediaAvaliacoesPorFilme,
  top5FilmesPorNota,
  filmesPorDiretor,
  distribuicaoPorGenero,
};
