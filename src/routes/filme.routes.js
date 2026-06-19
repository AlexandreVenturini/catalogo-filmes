const { Router } = require('express');
const controller = require('../controllers/filme.controller');

const router = Router();

router.post('/', controller.criar);
router.post('/lote', controller.criarVarios);
router.get('/', controller.buscarTodos);
router.get('/:id', controller.buscarPorId);
router.patch('/:id', controller.atualizar);
router.patch('/:id/avaliacoes', controller.adicionarAvaliacao);
router.delete('/filtro', controller.removerComFiltro);
router.delete('/:id', controller.removerPorId);

module.exports = router;
