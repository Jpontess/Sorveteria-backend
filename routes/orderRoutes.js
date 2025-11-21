const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');

// POST /api/orders -> Criar um pedido (Cliente)
router.post('/', orderController.createOrder);

// GET /api/orders -> Listar pedidos (Admin)
router.get('/', orderController.getAllOrders);
router.patch('/:id',orderController.updateOrder)

module.exports = router;