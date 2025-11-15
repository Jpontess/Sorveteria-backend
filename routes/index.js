const express = require('express')
const router = express.Router()

const healthRotas = require('./healthRoutes')
const productRotas = require('./productRoutes')

router.use('/health', healthRotas)
router.use('/products', productRotas)

module.exports = router