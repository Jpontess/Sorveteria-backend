const express = require('express')
const router = express.Router()

const healthRotas = require('./healthRoutes')
const productRotas = require('./productRoutes')
const loginRotas = require('./loginRoutes')
const orderRotas = require('./orderRoutes')

router.use('/health', healthRotas)
router.use('/products', productRotas)
router.use('/auth',loginRotas)
router.use('/order', orderRotas)

module.exports = router