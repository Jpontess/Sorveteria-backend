import { Router } from 'express'
const router = Router()

import { createProduct, listarProdutos, ListarPorId, EditarProduto, DeletarProduto } from '../Controllers/productController.js'

router.post('/', createProduct)
router.get('/', listarProdutos)
router.get('/:id',ListarPorId)
router.put('/:id', EditarProduto)
router.delete('/:id', DeletarProduto)

export default router