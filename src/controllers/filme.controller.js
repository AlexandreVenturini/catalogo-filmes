const service = require('../services/filme.service');

async function criar(req, res) {
  try {
    const resultado = await service.inserirUm(req.body);
    res.status(201).json({ sucesso: true, dados: resultado });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

async function criarVarios(req, res) {
  try {
    const resultado = await service.inserirVarios(req.body);
    res.status(201).json({ sucesso: true, dados: resultado });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

async function buscarPorId(req, res) {
  try {
    const filme = await service.buscarPorId(req.params.id);

    if (!filme) {
      return res.status(404).json({ sucesso: false, mensagem: 'Filme não encontrado' });
    }

    res.status(200).json({ sucesso: true, dados: filme });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

async function buscarTodos(req, res) {
  try {
    const { ano, genero_id, diretor_id, campos } = req.query;
    const filtro = {};

    if (ano) filtro.ano = parseInt(ano);
    if (genero_id) filtro.genero_id = genero_id;
    if (diretor_id) filtro.diretor_id = diretor_id;

    const projecao = {};
    if (campos) campos.split(',').forEach(c => projecao[c.trim()] = 1);

    const filmes = await service.buscarTodos(filtro, projecao);
    res.status(200).json({ sucesso: true, total: filmes.length, dados: filmes });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

async function atualizar(req, res) {
  try {
    const filme = await service.atualizarPorId(req.params.id, req.body);

    if (!filme) {
      return res.status(404).json({ sucesso: false, mensagem: 'Filme não encontrado' });
    }

    res.status(200).json({ sucesso: true, dados: filme });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

async function adicionarAvaliacao(req, res) {
  try {
    const filme = await service.adicionarAvaliacao(req.params.id, req.body);

    if (!filme) {
      return res.status(404).json({ sucesso: false, mensagem: 'Filme não encontrado' });
    }

    res.status(200).json({ sucesso: true, dados: filme });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

async function removerPorId(req, res) {
  try {
    const filme = await service.removerPorId(req.params.id);

    if (!filme) {
      return res.status(404).json({ sucesso: false, mensagem: 'Filme não encontrado' });
    }

    res.status(200).json({ sucesso: true, mensagem: 'Filme removido com sucesso' });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

async function removerComFiltro(req, res) {
  try {
    const { ano, genero_id } = req.query;
    const filtro = {};

    if (ano) filtro.ano = parseInt(ano);
    if (genero_id) filtro.genero_id = genero_id;

    if (Object.keys(filtro).length === 0) {
      return res.status(400).json({ sucesso: false, mensagem: 'Informe ao menos um filtro para remoção em lote' });
    }

    const resultado = await service.removerComFiltro(filtro);
    res.status(200).json({ sucesso: true, removidos: resultado.deletedCount });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

module.exports = {
  criar,
  criarVarios,
  buscarPorId,
  buscarTodos,
  atualizar,
  adicionarAvaliacao,
  removerPorId,
  removerComFiltro,
};
