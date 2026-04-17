import { Router } from 'express';
const router = Router();
import { createOrder, getAllOrders, updateOrder } from '../Controllers/orderController.js';

// POST /api/orders -> Criar um pedido (Cliente)
router.post('/', createOrder);

// GET /api/orders -> Listar pedidos (Admin)
router.get('/', getAllOrders);
router.patch('/:id',updateOrder);

export default router;