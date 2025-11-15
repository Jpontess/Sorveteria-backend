const express = require('express')
const router = express.Router()

const productController = require('../Controllers/productController')

router.post('/', productController.createProduct)
router.get('/', productController.listarProdutos)
router.get('/:id',productController.ListarPorId)
router.put('/:id', productController.EditarProduto)
router.delete('/:id', productController.DeletarProduto)

module.exports = router