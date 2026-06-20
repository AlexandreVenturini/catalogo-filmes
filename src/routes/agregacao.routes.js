const { Router } = require('express');
const controller = require('../controllers/agregacao.controller');

const router = Router();

router.get('/media-avaliacoes', controller.mediaAvaliacoesPorFilme);
router.get('/top5', controller.top5FilmesPorNota);
router.get('/filmes-por-diretor', controller.filmesPorDiretor);
router.get('/distribuicao-por-genero', controller.distribuicaoPorGenero);

module.exports = router;
