const service = require('../services/genero.service');

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
    const genero = await service.buscarPorId(req.params.id);

    if (!genero) {
      return res.status(404).json({ sucesso: false, mensagem: 'Gênero não encontrado' });
    }

    res.status(200).json({ sucesso: true, dados: genero });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

async function buscarTodos(req, res) {
  try {
    const { campos } = req.query;
    const projecao = {};

    if (campos) campos.split(',').forEach(c => projecao[c.trim()] = 1);

    const generos = await service.buscarTodos({}, projecao);
    res.status(200).json({ sucesso: true, total: generos.length, dados: generos });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

async function atualizar(req, res) {
  try {
    const genero = await service.atualizarPorId(req.params.id, req.body);

    if (!genero) {
      return res.status(404).json({ sucesso: false, mensagem: 'Gênero não encontrado' });
    }

    res.status(200).json({ sucesso: true, dados: genero });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

async function removerPorId(req, res) {
  try {
    const genero = await service.removerPorId(req.params.id);

    if (!genero) {
      return res.status(404).json({ sucesso: false, mensagem: 'Gênero não encontrado' });
    }

    res.status(200).json({ sucesso: true, mensagem: 'Gênero removido com sucesso' });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: erro.message });
  }
}

async function removerComFiltro(req, res) {
  try {
    const { nome } = req.query;
    const filtro = {};

    if (nome) filtro.nome = nome;

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
  removerPorId,
  removerComFiltro,
};
