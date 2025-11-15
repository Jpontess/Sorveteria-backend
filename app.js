const ex = require('express')
const cors = require('cors')
const mainRouter = require('./src/routes/index')

const app = ex()

app.use(cors())

app.use(ex.json())

app.use('/api', mainRouter)

module.exports = app