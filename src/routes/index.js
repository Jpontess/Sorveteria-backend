const exp = require('express')
const router = exp.Router()

const healthRotas = require('./health')

router.use('/health', healthRotas)

module.exports = router